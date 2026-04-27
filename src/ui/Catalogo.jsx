import "../style/catalogo.css";
import { remeras } from "../archivos/db";
import { useContext, useEffect, useState } from "react";
import { TiendaContext } from "../context/TiendaContext";
export const Catalogo = () => {
  const [mostrarProductos, setMostrarProductos] = useState([])
  const { setProductoSeleccionado } = useContext(TiendaContext);
useEffect(() => {
  const obtenerProductos = async () => {
try {

  const res = await fetch("http://localhost:3000/api/productos");
  
  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();
  console.log(data)
  setMostrarProductos(data);
  console.log(data, "la data desde la base de datos")
}catch (error) {
  console.error("Error al obtener productos:", error);
}
  }
  obtenerProductos();
},[])
  return (
    <section className="catalogo">
      <div className="catalogo-cont">
        {mostrarProductos.map((remera, index) => (
          <div
            className="catalogo__producto"
            key={index}
            onClick={() => setProductoSeleccionado(remera)}
          >
            <img
              src={remera.imagen}
              alt={remera.nombre}
              className="catalogo__producto--imagen"
            />
            <h3 className="catalogo__producto--nombre">{remera.nombre}</h3>
            <p className="catalogo__producto--precio">${remera.precio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


//https://res.cloudinary.com/dren5qsyw/image/upload/v1776009051/pruebacloud_jqckzo.jpg