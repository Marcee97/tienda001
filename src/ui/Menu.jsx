import { useContext, useState } from "react";
import "../style/menu.css";
import { MenuDesplegable } from "./MenuDesplegable";
import { TiendaContext } from "../context/TiendaContext";
export const Menu = () => {
const {openCloseMenu, setOpenCloseMenu, carrito,visibilidadTitle, openCloseCarrito, openChatbot} = useContext(TiendaContext)

  return (
    <section className={openCloseMenu || openCloseCarrito || openChatbot ? "menu menu-hidden" : "menu"}>
      <div className="img-back-container">
      </div>
      <div className={"menu__container"}>
        <h1 className={visibilidadTitle ? "menu__title title-hidden" : "menu__title "}>SAICO</h1>
        <ul className="menu__list" onClick={(e)=>{e.stopPropagation(); setOpenCloseMenu(prev => !prev);
          console.log("estado de :",openCloseMenu)
        }}>
          <li className="menu__item">
            <img className={openCloseMenu || openCloseCarrito || openChatbot ? "menu__icon menu-hidden" : "menu__icon material-symbols-outlined"} src="\menu-duo-lg-svgrepo-com.svg"/>
          </li>
        </ul>
        {carrito.length > 0 &&
          <p className={openCloseMenu || openCloseCarrito ? "menu__icon-cantidad-items menu-hidden" : "menu__icon-cantidad-items"}>{carrito.length}</p>
        }
      </div>
    </section>
  );
};
