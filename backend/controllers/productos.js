const { pool } = require("../database/db.config.js");

const getProductos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.id,
        p.nombre,
        p.precio,
        MIN(pi.url) AS imagen
      FROM productos p
      LEFT JOIN producto_imagenes pi 
        ON pi.producto_id = p.id
      GROUP BY p.id
    `);

    console.log(result.rows, "estos son los productos que se estan enviando al frontend");
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProductos };