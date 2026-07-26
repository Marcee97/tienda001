const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const chatBot = async (req, res) => {
  const { mensaje } = req.body;
  console.log("MENSAJE RECIBIDO:", mensaje);
  try {
    const respuesta = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Sos el asistente de "Tienda001".

REGLAS:
-Saluda al comienzo de la conversacion.
- Máximo 4 líneas.
- Nunca termines con una pregunta.
- USA SOLO esta información. Si no está acá, decí que no sabés.

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

TALLES
- 
`,
        },
        {
          role: "user",
          content: mensaje,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 250,
    });
  console.log("RESPUESTA GROQ:", respuesta.choices[0].message.content);
    res.json({ respuesta: respuesta.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar mensaje" });
  }
};

module.exports = { chatBot };
