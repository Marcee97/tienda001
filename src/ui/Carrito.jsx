import { useContext, useEffect } from "react";
import "../style/carrito.css";
import { TiendaContext } from "../context/TiendaContext";
import { ControlCantidad } from "../components/ControlCantidad/ControlCantidad.jsx";

export const Carrito = () => {
  const {
    openCloseCarrito,
    setOpenCloseCarrito,
    carrito,
    cambiarCantidad,
    ejecutarCompraCarrito,
  } = useContext(TiendaContext);
  useEffect(() => {

  console.log(carrito?.[0]?.imagenes[0]);
  }, [carrito])

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
        {carrito.length > 0 ? (
          carrito.map((item, index) => (
            <article className="carrito__item" key={index}>
              <img
                className="carrito__item-image"
                src={item.imagenes?.[0]?.url}
                alt={item.nombre}
              />
              <div className="carrito__item-cont">
                <h4 className="carrito__item-title">{item.nombre}</h4>
                <p className="carrito__item-precio">${item.precio}</p>
                <p>Talle: {item.talle}</p>
                <div className="carrito__item-control-cantidad">
                  <p className="carrito__item-control-text">Cantidad</p>
                  <ControlCantidad
                    value={item.cantidad}
                    onChange={(nuevaCantidad) =>
                      cambiarCantidad(item.id, item.talle, nuevaCantidad)
                    }
                  />
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="carrito__empty">
            <p className="carrito__empty-text">Tu carrito está vacío</p>
          </div>
        )}
      </div>
      <div className="carrito__footer">
        <div className="carrito__total">
          <h4 className="carrito__total-label">Total</h4>
          <p className="carrito__total-price">${carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)}</p>
        </div>
        <div className="carrito__actions">
          <button
            className="carrito__button carrito__button--primary"
            onClick={() => ejecutarCompraCarrito()}
          >
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
