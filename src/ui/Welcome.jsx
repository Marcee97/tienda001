import React, { useState } from "react";
import "../style/welcome.css";
import { useContext } from "react";
import { TiendaContext } from "../context/TiendaContext";

export const Welcome = () => {
  const { setOpenCloseModalCompra } = useContext(TiendaContext);
  const [colorNegro, setColorNegro] = useState(false);

  return (
    <section className="welcome">
       <div
          className="welcome__boton--toggle"
          onClick={() => setColorNegro((prev) => !prev)}
        >
        <div className="welcome__cont-boton-punto">
          <div className="welcome__boton-punto"/>
        </div>
        <p className="welcome__cont-boton-text"></p>
        </div>
      <div className="welcome__bg">
        
        <div
          className="welcome__img welcome__img--blanca"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dren5qsyw/image/upload/v1781545296/ChatGPT_Image_15_jun_2026_02_41_06_p.m_n9dgm7.png')" }}
        />
        <div
          className={`welcome__img welcome__img--negra ${colorNegro ? "visible" : ""}`}
          style={{ backgroundImage: "url('https://res.cloudinary.com/dren5qsyw/image/upload/v1781543863/ChatGPT_Image_15_jun_2026_02_13_58_p.m_qhkueo.png')" }}
        />
      </div>

      <div className="welcome__contenido">
        <h6 className="welcome__subtitulo">
          {colorNegro ? "Remeras negras" : "Remeras blancas"}
        </h6>
       
       {/* <button
          className="welcome__boton"
          onClick={() => setOpenCloseModalCompra(true)}
        >
          Start
        </button>*/}
      </div>
    </section>
  );
};