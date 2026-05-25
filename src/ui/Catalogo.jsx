import "../style/catalogo.css";
import { useContext, useEffect, useState } from "react";
import { TiendaContext } from "../context/TiendaContext";
export const Catalogo = () => {
  const [mostrarProductos, setMostrarProductos] = useState([])
  const { setProductoSeleccionado } = useContext(TiendaContext);

  return (
    <section className="catalogo">
      <div className="catalogo-cont">
       
      </div>
    </section>
  );
};


