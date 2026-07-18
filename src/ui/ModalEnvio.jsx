import React from "react";
import "../style/modalenvio.css";
import { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { TiendaContext } from "../context/TiendaContext";

export const ModalEnvio = () => {
  const {
    carrito,
    openCloseEnvios,
    setOpenCloseEnvios,
    datosFormulario,
    setDatosFormulario,
  } = useContext(TiendaContext);

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [openCloseProductoss, setOpenCloseProductoss] = useState(false);
  const refs = {
    nombre: useRef(null),
    calle: useRef(null),
    numero: useRef(null),
    provincia: useRef(null),
    ciudad: useRef(null),
    codigoPostal: useRef(null),
    telefono: useRef(null),
    email: useRef(null),
  };

  useEffect(() => {}, [carrito]);

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

  const cambiosFormulario = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const enviarFormulario = async () => {
    setCargando(true);
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
      setCargando(false);
      return; // ← para que no navegue a /undefined
    }
    window.location.href = data.init_point;
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosFormulario.nombre?.trim())
      nuevosErrores.nombre = "Ingresa tu Nombre y Apellido";
    if (!datosFormulario.calle?.trim())
      nuevosErrores.calle = "Ingresa la calle";
    if (!datosFormulario.numero?.trim())
      nuevosErrores.numero = "Ingresa el número";
    if (!datosFormulario.provincia?.trim())
      nuevosErrores.provincia = "Ingresa la provincia";
    if (!datosFormulario.ciudad?.trim())
      nuevosErrores.ciudad = "Ingresa la ciudad";
    if (!datosFormulario.codigoPostal?.trim())
      nuevosErrores.codigoPostal = "Ingresa el código postal";
    if (!datosFormulario.telefono?.trim())
      nuevosErrores.telefono = "Ingresa el teléfono";
    if (!datosFormulario.email?.trim()) {
      nuevosErrores.email = "Ingresa el email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFormulario.email)) {
      nuevosErrores.email = "El email no es válido";
    }

    setErrores(nuevosErrores);
    const primerError = Object.keys(nuevosErrores)[0];
    if (primerError && refs[primerError]?.current?.focus())
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
      <div
        className={
          openCloseProductoss
            ? "modal-envio__productos productos--active"
            : "modal-envio__productos"
        }
      >
        <p
          className={
            openCloseProductoss
              ? "text-informativo"
              : "text-informativo--active"
          }
          onClick={() => setOpenCloseProductoss((prev) => !prev)}
        >
          <span className="">Resumen de Compra</span>
          <span className="modal-envio__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </p>

        <div className="modal-envio__productos--cont">
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
                  <p className="modal-envio__item-talle">Talle: <span className="modal-envio__item-talle-numero">{item.talle}</span> </p>
                  <div className="modal-envio__item-cantidad">
                    <p className="modal-envio__item-cantidad-label">{item.cantidad}</p>
                    <p className="modal-envio__item-precio">${item.precio}</p>
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
        <div className="modal-envio__opciones"></div>
        <div
          className={`modal-envio__formulario ${cargando ? "loading--active" : ""}`}
        >
          <h3 className="modal-envio__formulario--titulo">Datos Personales</h3>
          <p className="modal-envio__label">
            Nombre y Apellido{" "}
            {errores.nombre && (
              <span className="modal-envio__error">{errores.nombre}</span>
            )}
          </p>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Jorge Cafrune"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.nombre}
          />
          <p className="modal-envio__label">
            Calle{" "}
            {errores.calle && (
              <span className="modal-envio__error">{errores.calle}</span>
            )}
          </p>
          <input
            type="text"
            name="calle"
            placeholder="Ej: Pellegrini"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.calle}
          />
          <p className="modal-envio__label">
            Numero de Calle{" "}
            {errores.numero && (
              <span className="modal-envio__error">{errores.numero}</span>
            )}
          </p>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="numero"
            placeholder="Ej: 1077"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.numero}
          />
          <p className="modal-envio__label">
            Provincia{" "}
            {errores.provincia && (
              <span className="modal-envio__error">{errores.provincia}</span>
            )}
          </p>
          <input
            type="text"
            name="provincia"
            placeholder="Provincia"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.provincia}
          />
          <p className="modal-envio__label">
            Localidad{" "}
            {errores.ciudad && (
              <span className="modal-envio__error">{errores.ciudad}</span>
            )}
          </p>

          <input
            type="text"
            name="ciudad"
            placeholder="Localidad"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.ciudad}
          />
          <p className="modal-envio__label">
            CodigoPostal{" "}
            {errores.codigoPostal && (
              <span className="modal-envio__error">{errores.codigoPostal}</span>
            )}
          </p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="codigoPostal"
            placeholder="Codigo postal (ej:5800)"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.codigoPostal}
          />
          <p className="modal-envio__label">
            Telefono{" "}
            {errores.telefono && (
              <span className="modal-envio__error">{errores.telefono}</span>
            )}
          </p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="telefono"
            placeholder="Telefono"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.telefono}
          />
          <p className="modal-envio__label">
            Email{" "}
            {errores.email && (
              <span className="modal-envio__error">{errores.email}</span>
            )}
          </p>
          <input
            type="email"
            name="email"
            placeholder="Ej: alanturing@gmail.com"
            className="modal-envio__input-formulario"
            onChange={cambiosFormulario}
            ref={refs.email}
          />
        </div>
        <div className="modal-envio__acciones">
          <button
            className="modal-envio__boton-confirmar"
            onClick={() => {
              if (!validarFormulario()) return;
              setCargando(true);
              enviarFormulario();
            }}
          >
            {cargando ? (
              <span className="btn-text-cargando">Redirigiendo...</span>
            ) : (
              <span className="btn-text-confirmar">Confirmar</span>
            )}
          </button>
          {/*Crea base de datos setear este formulario crear logica dde backend en hoja aparte */}
        </div>
      </div>
    </section>
  );
};
