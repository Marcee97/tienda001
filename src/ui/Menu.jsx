import { useContext } from "react";
import "../style/menu.css";
import { Introduccion } from "./Introduccion";
import { MenuDesplegable } from "./MenuDesplegable";
import { TiendaContext } from "../context/TiendaContext";
export const Menu = () => {
const {openCloseMenu, setOpenCloseMenu, carrito} = useContext(TiendaContext)
  return (
    <section className="menu">
        <MenuDesplegable/>
      <div className="img-back-container">
      
      </div>
      <div className="menu__container">
        <h1 className="menu__title">NOMBRE</h1>
        <ul className="menu__list" onClick={(e)=>{e.stopPropagation(); setOpenCloseMenu(prev => !prev)}}>
          <li className="menu__item">
            <span className="menu__icon material-symbols-outlined">menu</span>
          </li>
        </ul>
        {carrito.length > 0 &&

          <p className="menu__icon-cantidad-items">{carrito.length}</p>
        }
      </div>
    </section>
  );
};
