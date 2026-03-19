import { useContext, useState } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";

export const ModalCompra = () => {
  const { productoSeleccionado, setProductoSeleccionado } = useContext(TiendaContext);
  const [cantidad, setCantidad] = useState(1);

  const cerrarModalCompra = ()=> {
setProductoSeleccionado(null)
  }
  return (
    <section
      className={
        productoSeleccionado
          ? "modal-compra modal-compra--active"
          : "modal-compra"
      }
    >
      <div className="modal-compra__cont">
        {productoSeleccionado && (
          <div className="modal-compra__contenedor">
            <span className="modal-compra__icon-cerrar material-symbols-outlined" onClick={cerrarModalCompra}>
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
          <p className="modal-compra__cantidad-label">CANTIDAD</p>

          <div className="modal-compra__cantidad-control">
            <button
              className="modal-compra__cantidad-btn"
              onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>

            <input
              className="modal-compra__input-cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            />

            <button
              className="modal-compra__cantidad-btn"
              onClick={() => setCantidad((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="modal-compra__total">
          <div className="modal-compra__total-cont">
            <h3 className="modal-compra__precio-label">TOTAL:</h3>
            {productoSeleccionado && (
              <h4 className="modal-compra__precio-total">
                ${productoSeleccionado.precio}
              </h4>
            )}
          </div>
        </div>

        <div className="modal-compra__acciones">
          <button className="modal-compra__btn-agregar">
            Agregar al carrito
          </button>
          <button className="modal-compra__btn-comprar">Comprar ahora</button>
        </div>
      </div>
    </section>
  );
};
