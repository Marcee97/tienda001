const { pool } = require("../../database/db.config");



const getVentaByPaymentID = async (req, res) => {
  const { paymentID } = req.params;
  const result = await pool.query(
    "SELECT * FROM ventas WHERE mp_payment_id = $1",
    [paymentID],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Venta no encontrada" });
  }

  res.json(result.rows[0]);
};

module.exports = { getVentaByPaymentID };