import { useContext } from "react";
import "../style/carrito.css";
import { TiendaContext } from "../context/TiendaContext";
import { ControlCantidad } from "../components/ControlCantidad/ControlCantidad.jsx";

export const Carrito = () => {
  const { openCloseCarrito, setOpenCloseCarrito } = useContext(TiendaContext);

  return (
    <section
      className={openCloseCarrito ? "carrito carrito--active" : "carrito"}
    >
      <span
        className="material-symbols-outlined carrito__close"
        onClick={(e) => {
          e.stopPropagation();
          setOpenCloseCarrito((prev) => !prev);
        }}
      >
        close
      </span>
      <div className="carrito__container">
        <h3 className="carrito__title">Carrito.</h3>
          <article className="carrito__item">
            <img
              className="carrito__item-image"
              src="https://i.pinimg.com/736x/fe/17/7b/fe177b08663ee52315ee5bab56502416.jpg"
              alt="imagen de producto en el carrito"
            />
            <div className="carrito__item-cont">
              <h4 className="carrito__item-title">Nombre remera</h4>
              <p className="carrito__item-price">12000$</p>
              <div></div>
              <div className="carrito__item-control-cantidad">
                <p>Cantidad</p>
                <ControlCantidad />
              </div>
            </div>
          </article>
      </div>
      <div className="carrito__footer">
        <div className="carrito__total">
          <h4 className="carrito__total-label">Total</h4>
          <p className="carrito__total-price">0000$</p>
        </div>

        <div className="carrito__actions">
          <button className="carrito__button carrito__button--primary">
            Comprar
          </button>
          <button className="carrito__button carrito__button--secondary">
            Volver a Home
          </button>
        </div>
      </div>
    </section>
  );
};
