const Groq = require("groq-sdk");
require("dotenv").config();
const {pool} = require("../../database/db.config.js")
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Función real que consulta la base
const consultarStock = async (nombreProducto, talle, color) => {
  console.log("agente yendo a la base de datosss", nombreProducto);
  const result = await  pool.query(
    `
    SELECT v.stock, v.talle, c.nombre AS color, p.nombre AS producto
    FROM variantes v
    JOIN productos p ON v.producto_id = p.id
    JOIN colores c ON v.color_id = c.id
    WHERE p.nombre ILIKE $1
      AND ($2::text IS NULL OR v.talle ILIKE $2)
      AND ($3::text IS NULL OR c.nombre ILIKE $3)
    `,
    [`%${nombreProducto}%`, talle || null, color || null],
  );
  console.log(result, "lo que encontroel agente en la base de datos")
  return result.rows;
};

const tools = [
  {
    type: "function",
    function: {
      name: "consultarStock",
      description:
        "Consulta el stock disponible de una remera por nombre, talle y color",
      parameters: {
        type: "object",
        properties: {
          nombreProducto: {
            type: "string",
            description: "Nombre del producto, ej: remera basica",
          },
          talle: { type: "string", description: "Talle, ej: S, M, L, XL" },
          color: {
            type: "string",
            description: "Color, ej: blanco, negro, beige",
          },
        },
        required: ["nombreProducto"],
      },
    },
  },
];
const chatBot = async (req, res) => {
  const { mensaje } = req.body;

  try {
    const mensajes = [
      {
        role: "system",
        content: `Sos el asistente de "Tienda001".

REGLAS:
- Saluda al comienzo de la conversacion.
- Máximo 4 líneas.
- Nunca termines con una pregunta.
- Si te preguntan por STOCK o disponibilidad de talles/colores, SIEMPRE usá la herramienta consultarStock antes de responder. Nunca digas que no sabés sin haber llamado a la herramienta primero.
- Si te preguntan por stock disponible, usá la herramienta consultarStock.
- Se hacen envios a todo el pais.

PRECIOS:
- Remeras basicas blancas: 15.000
- Remeras basicas negras: 15.000
- Remeras basicas beige: 15.000
por el momento todas las remeras valen lo mismo

las remeras se achican un 2% despues del primer lavado
todas las remeras son 100% algodon

METODOS DE PAGO
- tarjetas de credito,debito o dinero en cuenta
- se hace todo a traves de mercado pago
`,
      },
      { role: "user", content: mensaje },
    ];

    const primeraRespuesta = await groq.chat.completions.create({
      messages: mensajes,
      model: "llama-3.3-70b-versatile",
      max_tokens: 250,
      tools,
      tool_choice: "auto",
    });

    const mensajeModelo = primeraRespuesta.choices[0].message;

    // Si el modelo decidió llamar a la función
    if (mensajeModelo.tool_calls) {
      mensajes.push(mensajeModelo);

      for (const toolCall of mensajeModelo.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments);
          console.log("ARGUMENTOS RECIBIDOS:", args);
        const filas = await consultarStock(args.nombreProducto, args.talle, args.color);

        mensajes.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(filas.length ? filas : { mensaje: "Sin stock encontrado" }),
        });
      }

      const respuestaFinal = await groq.chat.completions.create({
        messages: mensajes,
        model: "llama-3.3-70b-versatile",
        max_tokens: 250,
      });

      return res.json({ respuesta: respuestaFinal.choices[0].message.content });
    }

    res.json({ respuesta: mensajeModelo.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar mensaje" });
  }
};

module.exports = { chatBot };
