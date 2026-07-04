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
- Máximo 3 líneas.
- Nunca termines con una pregunta.
- USA SOLO esta información. Si no está acá, decí que no sabés.

- Se hacen envios a todo el pais.
- El costo del envio es de $1500, pero si la compra supera los $20.000 el envio es gratis.`,
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
