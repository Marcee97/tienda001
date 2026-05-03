const {pool} = require("../database/db.config.js");
const getProductos = async (req, res) => {

try{
const [rows] = await pool.query(`
  SELECT 
    p.id,
    p.nombre,
    p.precio,
    pi.url,
    pi.orden
  FROM productos p
  LEFT JOIN producto_imagenes pi 
    ON p.id = pi.producto_id
  ORDER BY p.id, pi.orden ASC
`);

const productosMap = {};

rows.forEach(row => {
  if (!productosMap[row.id]) {
    productosMap[row.id] = {
      id: row.id,
      nombre: row.nombre,
      precio: row.precio,
      imagenes: []
    };
  }

  if (row.url) {
    productosMap[row.id].imagenes.push({
      url: row.url,
      orden: row.orden
    });
  }
});

const productos = Object.values(productosMap);
res.json(productos);
} catch(error) {
  console.error(error);
}






  // try {
  //   const [rows] = await pool.query(`
  //     SELECT 
  //       p.id AS producto_id,
  //       p.nombre,
  //       p.precio,
  //       p.imagen,
  //       v.color,
  //       v.talle,
  //       v.stock
  //     FROM productos p
  //     JOIN variantes v ON p.id = v.producto_id
  //   `);

  //   const productosMap = {};

  //   rows.forEach(row => {
  //     if (!productosMap[row.producto_id]) {
  //       productosMap[row.producto_id] = {
  //         id: row.producto_id,
  //         nombre: row.nombre,
  //         precio: row.precio,
  //         imagen: row.imagen,
  //         variantes: []
  //       };
  //     }

  //     productosMap[row.producto_id].variantes.push({
  //       color: row.color,
  //       talle: row.talle,
  //       stock: row.stock
  //     });
  //   });

  //   const productos = Object.values(productosMap);

  //   res.json(productos);

  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Error" });
  // }
};

module.exports = { getProductos };