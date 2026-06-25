import React, { useContext, useEffect } from "react";
import "../Success/success.css";
import { TiendaContext } from "../../context/TiendaContext";

export const Success = () => {
  useEffect(() => {
    console.log("estas en el success");
  }, []);
const {datosFormulario} = useContext(TiendaContext);
  return (
    <section className="success">
      <div className="success__container">
        <h3 className="success__title">Pagaste correctamente</h3>
        <span class="material-symbols-outlined success__icon">
          check_circle
        </span>
        <p className="success__text">
          Pagaste: <span className="success__price">{datosFormulario.precio}</span>
        </p>
      </div>
      <div className="success__cont--email">
        <p className="success__text">
          Te enviamos un email a
          <span className="success__email"> turing@gmail.com</span>
        </p>
      </div>
      <div className="success__cont--orden">
        <p className="success__orden">Tu numero de orden 225478</p>
      </div>
      <button className="success__button">Volver Al Home</button>
    </section>
  );
};
