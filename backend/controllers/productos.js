const {pool} = require("../database/db.config.js");
const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id AS producto_id,
        p.nombre,
        p.precio,
        p.imagen,
        v.color,
        v.talle,
        v.stock
      FROM productos p
      JOIN variantes v ON p.id = v.producto_id
    `);

    const productosMap = {};

    rows.forEach(row => {
      if (!productosMap[row.producto_id]) {
        productosMap[row.producto_id] = {
          id: row.producto_id,
          nombre: row.nombre,
          precio: row.precio,
          imagen: row.imagen,
          variantes: []
        };
      }

      productosMap[row.producto_id].variantes.push({
        color: row.color,
        talle: row.talle,
        stock: row.stock
      });
    });

    const productos = Object.values(productosMap);

    res.json(productos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
};

module.exports = { getProductos };