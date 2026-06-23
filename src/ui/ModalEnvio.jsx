import React from "react";
import "../style/modalenvio.css";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { TiendaContext } from "../context/TiendaContext";

export const ModalEnvio = () => {
  const { carrito, openCloseEnvios, setOpenCloseEnvios } =
    useContext(TiendaContext);

const [errores, setErrores] = useState({});


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
    calle: "",
    numero: "",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
  });

  const cambiosFormulario = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const enviarFormulario = async () => {
    console.log(datosFormulario, "estos son los datos del formulario");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/crear-preferencia`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify({ carrito, datosFormulario }),
      },
    );
    const data = await response.json();
    console.log(data, "aca deberia estar el init point");
     if (!data.init_point) {
    console.error("No llegó init_point");
    return; // ← para que no navegue a /undefined
  }
    window.location.href = data.init_point;
  };

const validarFormulario = () => {
  const nuevosErrores = {};

  if (!datosFormulario.nombre?.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
  if (!datosFormulario.calle?.trim()) nuevosErrores.calle = "La calle es obligatoria";
  if (!datosFormulario.numero?.trim()) nuevosErrores.numero = "El número es obligatorio";
  if (!datosFormulario.provincia?.trim()) nuevosErrores.provincia = "La provincia es obligatoria";
  if (!datosFormulario.ciudad?.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria";
  if (!datosFormulario.codigoPostal?.trim()) nuevosErrores.codigoPostal = "El código postal es obligatorio";
  if (!datosFormulario.telefono?.trim()) nuevosErrores.telefono = "El teléfono es obligatorio";
  if (!datosFormulario.email?.trim()) {
    nuevosErrores.email = "El email es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.email)) {
    nuevosErrores.email = "El email no es válido";
  }

  setErrores(nuevosErrores);
  return Object.keys(nuevosErrores).length === 0;
};
  return (
    <section
      style={{
        maxHeight: openCloseEnvios ? "100vh" : "0",
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
         
        </div>
        <div className="modal-envio__formulario">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre y Apellido"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.nombre && <p className="modal-envio__error">{errores.nombre}</p>}
          <input
            type="text"
            name="calle"
            placeholder="Calle"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.calle && <p className="modal-envio__error">{errores.calle}</p>}

          <input
            type="text"
            name="numero"
            placeholder="Numero"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.numero && <p className="modal-envio__error">{errores.numero}</p>}

          <input
            type="text"
            name="provincia"
            placeholder="Provincia"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.numero && <p className="modal-envio__error">{errores.numero}</p>}

          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad / Localidad"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.ciudad && <p className="modal-envio__error">{errores.ciudad}</p>}
          <input
            type="text"
            name="codigoPostal"
            placeholder="Codigo postal (ej:5800)"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.codigoPostal && <p className="modal-envio__error">{errores.codigoPostal}</p>}
          <input
            type="text"
            name="telefono"
            placeholder="Telefono"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.telefono && <p className="modal-envio__error">{errores.telefono}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
          />
          {errores.email && <p className="modal-envio__error">{errores.email}</p>}
        </div>
        <div className="modal-envio__acciones">
          <button
            className="modal-envio__boton-confirmar"
            onClick={() => {
              if (!validarFormulario()) return;
              enviarFormulario();
            }}
          >
            Confirmar
          </button>
          {/*Crea base de datos setear este formulario crear logica dde backend en hoja aparte */}
        </div>
      </div>
    </section>
  );
};
