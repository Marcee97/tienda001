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
    pi.url,
    pi.orden

FROM variantes v

LEFT JOIN producto_imagenes pi
    ON v.producto_id = pi.producto_id
    AND v.color_id = pi.color_id


  LEFT JOIN colores c
    ON v.color_id = c.id

WHERE v.producto_id = ?
ORDER BY c.orden, pi.orden;`, [id]);
    console.log(rows, "esto se son las variantes del producto seleccionado del catalogo")
    res.json(rows)
  // try {
  //   const [rows] = await pool.query(`SELECT * FROM variantes WHERE producto_id = ?`, [req.body.productoId]);
  //   res.json(rows);
  //   console.log(rows, "estas sonm las variantes del producto seleccionado")
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Error al obtener las variantes" });
  // }
};

module.exports = { getVariantes };