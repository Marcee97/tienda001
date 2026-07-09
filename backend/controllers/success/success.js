const { pool } = require("../../database/db.config");



const getVentaByPaymentID = async (req, res) => {

    const { paymentID } = req.params;
    const result = await pool.query("SELECT * FROM ventas WHERE mp_payment_id = $1", [paymentID]);
    res.json(result.rows);
}

module.exports = { getVentaByPaymentID };