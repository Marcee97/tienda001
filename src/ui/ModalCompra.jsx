import { useContext } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";

export const ModalCompra = () => {
  const { productoSeleccionado } = useContext(TiendaContext);

  return (
    <section
      className={productoSeleccionado ? "modal-compra modal-compra--active" : "modal-compra"}
    >
      <div className="modal-compra__cont">

     
      {productoSeleccionado && (
        <div className="modal-compra__contenedor">
          <span className="modal-compra__cerrar material-symbols-outlined">
            close
          </span>

          <img
            src={productoSeleccionado.imagen}
            alt={productoSeleccionado.nombre}
            className="modal-compra__imagen"
            />

          <h4 className="modal-compra__titulo">
            {productoSeleccionado.nombre}
          </h4>

          <p className="modal-compra__precio">
            ${productoSeleccionado.precio}
          </p>
        </div>
      )}

      <div className="modal-compra__talles">

        <div className="modal-compra__talles-botones">
        <p className="modal-compra__label">TALLA</p>
        <div className="modal-compra__cont-talles-botones">
          <button className="modal-compra__talle-btn">S</button>
          <button className="modal-compra__talle-btn">M</button>
          <button className="modal-compra__talle-btn">XL</button>
          <button className="modal-compra__talle-btn">XXL</button>
        </div>
        </div>
      </div>

      <div className="modal-compra__cantidad">
        <p className="modal-compra__label">CANTIDAD</p>
        <input className="modal-compra__input-cantidad" type="number" />
      </div>

      <div className="modal-compra__acciones">
        <button className="modal-compra__btn-agregar">
          Agregar al carrito
        </button>

        <button className="modal-compra__btn-comprar">
          Comprar ahora
        </button>
      </div>
      </div>

    </section>
  );
};