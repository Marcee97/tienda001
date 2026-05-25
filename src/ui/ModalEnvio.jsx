import React from "react";
import "../style/modalenvio.css";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { TiendaContext } from "../context/TiendaContext";

export const ModalEnvio = () => {
  const { carrito, openCloseEnvios, setOpenCloseEnvios } =
    useContext(TiendaContext);

  useEffect(() => {
    console.log(carrito, "este es el carrito en el modal de envio");
  }, [carrito]);

  const actulizarStock = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/actualizar-stock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carrito }),
        },
      );
    } catch (error) {
      console.error("Error al actualizar el stock", error);
    }
  };


  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    calle:"",
    numero:"",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
  })

  const cambiosFormulario = (e) => {
    setDatosFormulario({...datosFormulario, [e.target.name] : e.target.value})
  }

  const enviarFormulario = async()=> {
    console.log(datosFormulario, "estos son los datos del formulario")
   
    const response = await fetch(`https://9f71-181-165-192-32.ngrok-free.app/api/crear-preferencia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({carrito, datosFormulario}),

    });
    const data = await response.json()
    console.log(data, "aca deberia estar el init point")
     window.location.href = data.init_point;
    
  }
  return (
    <section
      style={{
        maxHeight: openCloseEnvios ? "80vh" : "0",
        transition: "max-height 0.4s ease",
      }}
      className="modal-envio"
    >
      <div className="modal-envio__header">
        <h3 className="modal-envio__title">Envio</h3>
        <span
          className="material-symbols-outlined modal-envio__close"
          onClick={(e) => {
            e.stopPropagation();
            setOpenCloseEnvios((prev) => !prev);
          }}
        >
          close
        </span>
      </div>
      <div className="modal-envio__productos">
        <div className="modal-envio__productos">
          {carrito.length > 0 ? (
            carrito.map((item, index) => (
              <article className="modal-envio__item" key={index}>
                <img
                  className="modal-envio__item-imagen"
                  src={item.imagen}
                  alt={item.nombre}
                />
                <div className="modal-envio__item-cont">
                  <h4 className="modal-envio__item-titulo">{item.nombre}</h4>
                  <p className="modal-envio__item-precio">${item.precio}</p>
                  <p className="modal-envio__item-talle">Talle: {item.talle}</p>
                  <div className="modal-envio__item-cantidad">
                    <p className="modal-envio__item-cantidad-label">Cantidad</p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="modal-envio__vacio">
              <p className="modal-envio__vacio-texto">Tu carrito está vacío</p>
            </div>
          )}
        </div>
      </div>
      <div className="modal-envio__cont">
        <div className="modal-envio__opciones">
          <button className="modal-envio__btn-opcion">Retiro</button>
          <button className="modal-envio__btn-opcion">Envio</button>
        </div>
        <div className="modal-envio__formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre y Apellido"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
           <input
            type="text"
            name="numero"
            placeholder="Numero"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
           <input
            type="text"
            name="provincia"
            placeholder="Provincia"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad / Localidad"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          <input
            type="text"
            name="codigoPostal"
            placeholder="Codigo postal (ej:5800)"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Telefono"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
        </div>
        <div className="modal-envio__acciones">
          <button
            className="modal-envio__boton-confirmar"
            onClick={enviarFormulario}
          >
            Confirmar
          </button>
          {/*Crea base de datos setear este formulario crear logica dde backend en hoja aparte */}
        </div>
      </div>
    </section>
  );
};
