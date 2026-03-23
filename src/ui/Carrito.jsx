import { useContext } from "react";
import "../style/carrito.css";
import { TiendaContext } from "../context/TiendaContext";
export const Carrito = () => {
  const { openCloseCarrito, setOpenCloseCarrito } = useContext(TiendaContext);
  return (
    <section className={openCloseCarrito ? "carrito" : "carrito__active"}>
      <span
        className={"material-symbols-outlined carrito__icon-close"}
        onClick={(e)=> {e.stopPropagation(); setOpenCloseCarrito((prev) => !prev)}}
      >
        close
      </span>
      <div className="carrito-cont">
        <p>Aca iria el Carrito</p>
      </div>
    </section>
  );
};
