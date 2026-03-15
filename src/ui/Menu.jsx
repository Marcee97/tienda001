import "../style/menu.css";
import { Introduccion } from "./Introduccion";
import { MenuDesplegable } from "./MenuDesplegable";
export const Menu = () => {



  
  return (
    <section className="menu">
        <MenuDesplegable/>
      <div className="img-back-container">
        <img
          src="https://i.pinimg.com/736x/aa/21/44/aa2144411bcfad1ae783daafad6a5b23.jpg"
          className="img-back"
          alt="background"
        />
      </div>
      <div className="menu__container">
        <h1 className="menu__title">VALLEY</h1>
        <ul className="menu__list">
          <li className="menu__item">
            <span className="menu__icon material-symbols-outlined">menu</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
