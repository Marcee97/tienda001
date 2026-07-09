const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailCompra = async ({ email, nombre, carrito, total }) => {
  console.log(
    email,
    nombre,
    carrito,
    total,
    "esta es la info que llega al emailService",
  );
  await resend.emails.send({
    from: "Valley <onboarding@resend.dev>",
    to: email,
    subject: "✅ Confirmación de compra - Valley",
    html: `
  <h1>Gracias ${nombre}!</h1>
  <p>Tu compra fue confirmada.</p>
  ${carrito.map((item) => `
    <div>
      <p><strong>${item.nombre}</strong></p>
      <p>Talle: ${item.talle}</p>
      <p>Cantidad: ${item.cantidad}</p>
      <p>Precio: $${item.precio}</p>
    </div>
  `).join('')}
  <p><strong>Total: $${total}</strong></p>
`,
  });
};

module.exports = { enviarEmailCompra };
