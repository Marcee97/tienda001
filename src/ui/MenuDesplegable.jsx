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
          <img
            className="menu-desplegable-icons"
            src="\shoppingcart.svg"
            onClick={(e) => {
              e.stopPropagation();
              setOpenCloseCarrito((prev) => !prev);
            }}
          />

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
            onClick={(e) => toggleSeccion(e, "sorteos")}
          >
            <p className="menu__desplegable--numero-orden">
              (01)
              <span className="menu__desplegable--text-item">
                Sorteos
              </span>
            </p>

            <div
              className={`menu-desplegable__seccion ${
                seccionAbierta === "sorteos"
                  ? "menu-desplegable__seccion--active"
                  : ""
              }`}
            >
              <p className="menu__desplegable--contenido-text">
                Informacion Sobre Sorteos
              </p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "ubicacion")}
          >
            <p className="menu__desplegable--numero-orden">
              (02)
              <span className="menu__desplegable--text-item">Ubicación</span>
            </p>

            <div
              className={`menu-desplegable__seccion ${
                seccionAbierta === "ubicacion"
                  ? "menu-desplegable__seccion--active"
                  : ""
              }`}
            >
              <p className="menu__desplegable--contenido-text">
                Dirección, mapa, etc.
              </p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "sitio")}
          >
            <p className="menu__desplegable--numero-orden">
              (03)
              <span className="menu__desplegable--text-item">Sitio Web</span>
            </p>

            <div
              className={`menu-desplegable__seccion ${
                seccionAbierta === "sitio"
                  ? "menu-desplegable__seccion--active"
                  : ""
              }`}
            >
              <p className="menu__desplegable--contenido-text">
                Información del sitio web.
              </p>
            </div>
          </li>

          <li
            className="menu-desplegable-item"
            onClick={(e) => toggleSeccion(e, "chatbot")}
          >
            <p className="menu__desplegable--numero-orden">
              (04)
              <span className="menu__desplegable--text-item">ChatBot</span>
            </p>

            <div
              className={`menu-desplegable__seccion ${
                seccionAbierta === "chatbot"
                  ? "menu-desplegable__seccion--active"
                  : ""
              }`}
            >
              <p className="menu__desplegable--contenido-text">Chat aquí.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
