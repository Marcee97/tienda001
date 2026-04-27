const { pool } = require("../database/db.config")



const venta = async(req, res) => {
    try {
       const [rows] = await pool.query('SELECT * FROM productos')   
console.log(rows)
return res.json(rows)
    }catch(error){
        console.error("Error al obtener las ventas:", error);
    }
}

module.exports = { venta }

