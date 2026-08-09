const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailCompra = async ({ envio, carrito, total }) => {
  console.log(envio, "esto en el formulario que llega emnail service")
  const { nombre, email, calle, numero, ciudad, provincia, codigo_postal } = envio;

  console.log(envio, carrito, total, "esta es la info que llega al emailService");

  await resend.emails.send({
    from: "Hisbell <onboarding@resend.dev>",
    to: email,
    subject: "✅ Confirmación de compra - Hisbell",
    html: `
      <h1>Gracias ${nombre}!</h1>
      <p>Tu compra fue confirmada.</p>
      <p>Dirección: ${calle} ${numero}, ${ciudad}, ${provincia} (CP ${codigo_postal})</p>
      ${carrito
        .map(
          (item) => `
        <div>
          <p><strong>${item.nombre}</strong></p>
          <p>Talle: ${item.talle}</p>
          <p>Cantidad: ${item.cantidad}</p>
          <p>Precio: $${item.precio}</p>
        </div>
      `,
        )
        .join("")}
      <p><strong>Total: $${total}</strong></p>
    `,
  });
};

module.exports = { enviarEmailCompra };