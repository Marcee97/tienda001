import "../style/catalogo.css";
import { remeras } from "../archivos/db";
import { useContext } from "react";
import { TiendaContext } from "../context/TiendaContext";
export const Catalogo = () => {
  const { setProductoSeleccionado } = useContext(TiendaContext);

  return (
    <section className="catalogo">
      <div className="catalogo-cont">
        {remeras.map((remera, index) => (
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
