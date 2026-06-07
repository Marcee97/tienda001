const { pool } = require("../../database/db.config.js");

const datosDeVenta = async (req, res) => {
  const { nombre, direccion, ciudad, codigoPostal, telefono, email } = req.body;

  try {
    await pool.query(
      `INSERT INTO ventas (nombre, direccion, ciudad, codigo_postal, telefono, email) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre, direccion, ciudad, codigoPostal, telefono, email]
    );
    res.status(201).json({ message: "Datos de venta guardados correctamente" });
  } catch (error) {
    console.error("Error al guardar los datos de venta", error);
    res.status(500).json({ message: "Error al guardar los datos de venta" });
  }
};

module.exports = { datosDeVenta };