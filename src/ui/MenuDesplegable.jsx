import { useContext } from "react";
import "../style/menudesplegable.css";
import { TiendaContext } from "../context/TiendaContext";
import { Carrito } from "./Carrito";
export const MenuDesplegable = () => {
  const { openCloseMenu, setOpenCloseMenu } = useContext(TiendaContext);

  return (
    <section
      className={openCloseMenu ? "menu-desplegable-active" : "menu-desplegable"}
      onClick={() => setOpenCloseMenu((prev) => !prev)}
    >
      <Carrito/>
      <h2 className="menu-desplegable-title">VALLEY</h2>
      <div className="menu-desplegable-cont">
        <div className="menu-desplegable__icon-close-carrito">
          <span class="material-symbols-outlined menu-desplegable-icons">
shopping_cart
</span>
          <span
            className={"material-symbols-outlined menu-desplegable-icons"}
          >
            close
          </span>
         
        </div>
        <ul className="menu-desplegable-lista">
          <li className="menu-desplegable-item">Carrito</li>
          <li className="menu-desplegable-item">Sobre Nosotros</li>
          <li className="menu-desplegable-item">Ubicacion</li>
          <li className="menu-desplegable-item">Sitio Web</li>
        </ul>
      </div>
    </section>
  );
};
