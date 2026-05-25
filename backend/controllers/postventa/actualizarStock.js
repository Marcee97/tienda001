const { pool } = require("../../database/db.config.js");

const actualizarStock = async (req, res) => {
    const {carrito} = req.body;
  for (const item of carrito) {
    await pool.query(
      `UPDATE variantes 
       SET stock = stock - ?
       WHERE producto_id = ? AND color_id = ? AND talle = ?`,
      [item.cantidad, item.id, item.color, item.talle]
    );
  }
};
module.exports = {
  actualizarStock,
};  

