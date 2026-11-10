const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailCompra = async ({ envio, carrito, total }) => {
  console.log(envio, "esto en el formulario que llega emnail service")
  const { nombre, email, calle, numero, ciudad, provincia, codigo_postal } = envio;

  console.log(envio, carrito, total, "esta es la info que llega al emailService");

  await resend.emails.send({
    from: "Art3mia <soporte@art3mia.com>",
    to: email,
    subject: "✅ Confirmación de compra - Art3mia",
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
const enviarEmailSuscripcion = async ({ tipo, suscripcion, nuevosPagos }) => {
  const { nombre, email, calle, numero, ciudad, provincia, codigo_postal,
          producto, color, talle } = suscripcion;

  const numeroPago = ((nuevosPagos - 1) % 3) + 1;

  const asuntos = {
    alta: "✅ Tu suscripción está activa - Art3mia",
    pago: `💳 Recibimos tu pago ${numeroPago} de 3 - Art3mia`,
    envio: "📦 Estamos preparando tu envío - Art3mia",
  };

  const cuerpos = {
    alta: `<p>Tu suscripción fue activada. Se debitará un pago mensual y cada 3 pagos te enviamos tu remera.</p>`,
    pago: `<p>Recibimos tu pago ${numeroPago} de 3.</p>`,
    envio: `<p>Recibimos tu pago 3 de 3 y estamos preparando el envío de tu remera.</p>`,
  };

  await resend.emails.send({
    from: "Art3mia <soporte@art3mia.com>",
    to: email,
    subject: asuntos[tipo],
    html: `
      <h1>Hola ${nombre}!</h1>
      ${cuerpos[tipo]}
      <p><strong>${producto}</strong> - Color: ${color} - Talle: ${talle}</p>
      <p>Dirección de envío: ${calle} ${numero}, ${ciudad}, ${provincia} (CP ${codigo_postal})</p>
    `,
  });
};

module.exports = { enviarEmailCompra, enviarEmailSuscripcion  };