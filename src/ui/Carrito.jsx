import { useContext, useEffect } from "react";
import "../style/carrito.css";
import { TiendaContext } from "../context/TiendaContext";
import { SelectorCantidad } from "../components/SelectorCantidad/SelectorCantidad";
export const Carrito = () => {
  const {
    openCloseCarrito,
    setOpenCloseCarrito,
    carrito,
    setCarrito,
    cambiarCantidad,
    ejecutarCompraCarrito,
    openCloseEnvios,
    setOpenCloseEnvios,
    setOpenCloseMenu
  } = useContext(TiendaContext);
  const deleteItem = (id, talle, color) => {
    console.log(id, talle, color);
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (item) =>
          !(item.id === id && item.talle === talle && item.color === color),
      ),
    );
  };

  return (
    <section
      className={openCloseCarrito ? "carrito carrito--active" : "carrito"}
    >
      <span
        className="material-symbols-outlined carrito__close"
        onClick={(e) => {
          setOpenCloseCarrito((prev) => !prev);
          e.stopPropagation();
        }}
      >
        close
      </span>
      <div className="carrito__container">
        {carrito.length > 0 ? (
          carrito.map((item, index) => (
            <article className="carrito__item" key={index}>
              <img
                className="carrito__item-image"
                src={item.imagen}
                alt={item.nombre}
              />
              <div className="carrito__item-cont">
                <div className="carrito__item-cont-cabecera">
                  <h4 className="carrito__item-title">{item.nombre}</h4>
                  <img
                    src="\delete-svgrepo-com.svg"
                    alt="icono para borrar"
                    onClick={() => deleteItem(item.id, item.talle, item.color)}
                    className="carrito__icono--delete"
                  />
                </div>
                <p className="carrito__item-precio">${item.precio}</p>
                <p className="carrito__item-talle">Talle: {item.talle}</p>
                <div className="carrito__item-control-cantidad">
                  <SelectorCantidad
                    cantidad={item.cantidad}
                    setCantidad={(nuevaCantidad) =>
                      cambiarCantidad(
                        item.id,
                        item.talle,
                        item.color,
                        nuevaCantidad,
                      )
                    }
                    max={item.stock}
                  />
                </div>
              </div>
              <div className="carrito__cont--selector-cantidad"></div>
            </article>
          ))
        ) : (
          <div className="carrito__empty">
            <div className="carrito__empty--cont">

            <p className="carrito__empty-text">Tu carrito está vacío</p>
            <button className="carrito__button"  onClick={() => (
              setOpenCloseCarrito(false),
              setOpenCloseMenu(prev => !prev)
            )}>IR A COMPRAR</button>
            </div>
          </div>
        )}
      </div>
      <div className="carrito__footer">
        <div className={carrito.length ? "carrito__total" : "carrito__total--inactive"}>
          <div>
            <p className="carrito__total--subtotal">
              Subtotal
              <span className="carrito__total--subtotal--number">${carrito.reduce(
                (total, item) => total + item.precio * item.cantidad,
                0,
              )}</span>
            </p>
          </div>
          <p className="carrito__total-label">
            Total{" "}
            <span className="carrito__total-price">
              {" "}
              $
              {carrito.reduce(
                (total, item) => total + item.precio * item.cantidad,
                0,
              )}
            </span>
          </p>
        </div>
        <div className="carrito__actions">
          <button
            className={carrito.length ? "carrito__button" : "carrito__button--inactive"}
            onClick={(e) => {
              e.stopPropagation();
              if (carrito.length === 0) return;
              setOpenCloseEnvios((prev) => !prev);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
    </section>
  );
};
