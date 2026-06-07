const { pool } = require("../../database/db.config.js");

const actualizarStock = async (req, res) => {
  const { carrito } = req.body;

  try {
    await Promise.all(
      carrito.map((item) =>
        pool.query(
          `UPDATE variantes 
           SET stock = stock - $1
           WHERE producto_id = $2 AND color_id = $3 AND talle = $4 AND stock >= $1`,
          [item.cantidad, item.id, item.color, item.talle]
        )
      )
    );

    res.json({ ok: true });

  } catch (error) {
    console.error("Error al actualizar stock:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { actualizarStock };