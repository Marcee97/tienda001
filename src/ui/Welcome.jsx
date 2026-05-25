import React from "react";
import "../style/welcome.css";
import { useContext } from "react";
import { TiendaContext } from "../context/TiendaContext";
export const Welcome = () => {
  const { productoSeleccionado, setProductoSeleccionado, openCloseModalCompra,
    setOpenCloseModalCompra, } =
    useContext(TiendaContext);
  return (
    <section className="welcome">
      <div className="welcome__contenido">
        <h3>Bienvenido a Nuestra Tienda</h3>
      </div>
      <button className="welcome__boton" onClick={() => setOpenCloseModalCompra(true)}>
        Elegir
      </button>
    </section>
  );
};
