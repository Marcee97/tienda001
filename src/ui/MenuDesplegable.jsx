import { useContext, useState } from "react";
import "../style/menudesplegable.css";
import { TiendaContext } from "../context/TiendaContext";
import { Carrito } from "./Carrito";
export const MenuDesplegable = () => {
  const {
    openCloseMenu,
    setOpenCloseMenu,
    openCloseCarrito,
    setOpenCloseCarrito,
    carrito,
    cerrarModalCompra,
    setOpenCloseModalCompra,
  } = useContext(TiendaContext);

  const [seccionAbierta, setSeccionAbierta] = useState(null);

  const toggleSeccion = (e, seccion) => {
    e.stopPropagation();
    setSeccionAbierta((prev) => (prev === seccion ? null : seccion));
  };
  return (
    <section
      className={openCloseMenu ? "menu-desplegable-active" : "menu-desplegable"}
      onClick={(e) => {
        e.stopPropagation();
        setOpenCloseMenu(false);
      }}
    >
      <h2 className="menu-desplegable-title">NOMBRE</h2>
      <div
        className="menu-desplegable-cont"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-desplegable__icon-close-carrito">
          <span
            className="material-symbols-outlined menu-desplegable-icons"
            onClick={(e) => {
              e.stopPropagation();
              setOpenCloseCarrito((prev) => !prev);
            }}
          >
            shopping_cart
          </span>
          {carrito.length > 0 && (
            <p className="menu-desplegable__icon-cantidad-productos">
              {carrito.length}
            </p>
          )}
          <span
            className={"material-symbols-outlined menu-desplegable-icons"}
            onClick={(e) => setOpenCloseMenu(false)}
          >
            close
          </span>
        </div>
        <ul className="menu-desplegable-lista">
          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "nosotros")}
          >
            Sobre Nosotros
            <div
              className={`menu-desplegable__seccion ${seccionAbierta === "nosotros" ? "menu-desplegable__seccion--active" : ""}`}
            >
              <p>Contenido sobre nosotros</p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => {
              toggleSeccion(e, "ubicacion");
              e.stopPropagation();
            }}
          >
            Ubicacion
            <div
              className={`menu-desplegable__seccion ${seccionAbierta === "ubicacion" ? "menu-desplegable__seccion--active" : ""}`}
            >
              <p>Dirección, mapa, etc</p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "sitio")}
          >
            Sitio Web
            <div
              className={`menu-desplegable__seccion ${seccionAbierta === "sitio" ? "menu-desplegable__seccion--active" : ""}`}
            >
              <p>Info del sitio</p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "chatbot")}
          >
            ChatBot
            <div
              className={`menu-desplegable__seccion ${seccionAbierta === "chatbot" ? "menu-desplegable__seccion--active" : ""}`}
            >
              <p>Chat aquí</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
