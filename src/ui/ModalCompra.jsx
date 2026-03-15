import { useContext } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";

export const ModalCompra = () => {

  const { productoSeleccionado } = useContext(TiendaContext)

  if(!productoSeleccionado) return null

  return (
    <section className="modal-compra">
      <div className="modal-compra__contenedor">

        <h3 className="modal-compra__titulo">
          Compra del producto
        </h3>

        <img
          src={productoSeleccionado.imagen}
          alt="Imagen seleccionada del catalogo"
          className="modal-compra__imagen"
        />

        <h4 className="modal-compra__nombre">
          {productoSeleccionado.nombre}
        </h4>

        <p className="modal-compra__precio">
          ${productoSeleccionado.precio}
        </p>

      </div>
    </section>
  )
}