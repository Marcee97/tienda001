const {pool} = require("../database/db.config.js");

const getVariantes = async (req, res) => {
    console.log(req.body, "llega el id seleccionado para el modal");
  try {
    const [rows] = await pool.query(`SELECT * FROM variantes WHERE producto_id = ?`, [req.body.productoId]);
    res.json(rows);
    console.log(rows, "estas sonm las variantes del producto seleccionado")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las variantes" });
  }
};

module.exports = { getVariantes };