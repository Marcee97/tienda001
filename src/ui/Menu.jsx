import { useContext, useState } from "react";
import "../style/menu.css";
import { MenuDesplegable } from "./MenuDesplegable";
import { TiendaContext } from "../context/TiendaContext";
export const Menu = () => {
const {openCloseMenu, setOpenCloseMenu, carrito,visibilidadTitle} = useContext(TiendaContext)

  return (
    <section className={openCloseMenu ? "menu menu-hidden" : "menu"}>
      <div className="img-back-container">
      </div>
      <div className="menu__container">
        <h1 className={visibilidadTitle ? "menu__title hidden" : "menu__title "}>Lisbel</h1>
        <ul className="menu__list" onClick={(e)=>{e.stopPropagation(); setOpenCloseMenu(prev => !prev);
          console.log("estado de :",openCloseMenu)
        }}>
          <li className="menu__item">
            <span className={openCloseMenu ? "menu__icon material-symbols-outlined menu-hidden" : "menu__icon material-symbols-outlined"}>menu</span>
          </li>
        </ul>
        {carrito.length > 0 &&
          <p className="menu__icon-cantidad-items">{carrito.length}</p>
        }
      </div>
    </section>
  );
};
