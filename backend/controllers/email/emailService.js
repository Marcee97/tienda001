const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const enviarEmailCompra = async ({ email, nombre, carrito, total }) => {
  console.log(email, nombre, carrito, total, "esta es la info que llega al emailService");
  await resend.emails.send({
    from: 'Valley <noreply@tudominio.com>',
    to: email,
    subject: '✅ Confirmación de compra - Valley',
    html: `
      <h1>Gracias ${nombre}!</h1>
      <p>Tu compra fue confirmada.</p>
      <p>Total: $${total}</p>
    `
  });
};

module.exports = { enviarEmailCompra };