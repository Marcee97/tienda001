const {pool} = require("../database/db.config.js");

const getVariantes = async (req, res) => {
  
  const {id} = req.params;
  console.log(id, "llega el id seleccionado para el modal atraves de params");

    const [rows] = await pool.query(`SELECT
    v.id AS variante_id,
    v.producto_id,
    v.color_id,
    v.talle,
    v.stock,
    c.nombre AS color,
    p.precio AS precio,
    p.nombre AS nombre,
    pi.url,
    pi.orden

FROM variantes v

LEFT JOIN producto_imagenes pi
    ON v.producto_id = pi.producto_id
    AND v.color_id = pi.color_id

LEFT JOIN colores c
    ON v.color_id = c.id

LEFT JOIN productos p
    ON v.producto_id = p.id

ORDER BY c.orden, pi.orden`);

  console.log(rows, "catalogo completo");
  res.json(rows);
    
  
};

module.exports = { getVariantes };