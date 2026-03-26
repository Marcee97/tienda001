import { useContext, useState } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";
import { ControlCantidad } from "../components/ControlCantidad/ControlCantidad";

export const ModalCompra = () => {
  const {
    productoSeleccionado,
    setProductoSeleccionado,
    talleSeleccionado,
    setTalleSeleccionado,
    cantidad,
    setCantidad,
  } = useContext(TiendaContext);

  const cerrarModalCompra = () => {
    setProductoSeleccionado(null);
  };
  const talles = ["S", "M", "XL", "XXL"];



  //LOGICA DE PAGO-----
  const generarPago = async()=> {

    const res = await fetch('http://localhost:3000/api/pagos/crear-preferencia', {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(productoSeleccionado)
    })
    const data = await res.json()
    console.log("se ejecuta funcion de pagos", data)
    // window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`
     console.log(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`)
    
  }

  return (
    <section
      className={
        productoSeleccionado
          ? "modal-compra modal-compra--active"
          : "modal-compra"
      }
    >
      <div className="modal-compra__cont">
        {productoSeleccionado && (
          <div className="modal-compra__contenedor">
            <span
              className="modal-compra__icon-cerrar material-symbols-outlined"
              onClick={() => {
                cerrarModalCompra();
                setTalleSeleccionado(null);
              }}
            >
              close
            </span>

            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="modal-compra__imagen"
            />

            <h4 className="modal-compra__titulo">
              {productoSeleccionado.nombre}
            </h4>

            <p className="modal-compra__precio">
              ${productoSeleccionado.precio}
            </p>
          </div>
        )}

        <div className="modal-compra__talles">
          <div className="modal-compra__talles-botones">
            <p className="modal-compra__label">TALLA</p>
            <div className="modal-compra__cont-talles-botones">
              {talles.map((talle) => (
                <button
                  key={talle}
                  className={`modal-compra__talle-btn ${
                    talleSeleccionado === talle ? "active" : ""
                  }`}
                  onClick={() => setTalleSeleccionado(talle)}
                >
                  {talle}
                </button>
              ))}
            </div>
          </div>
        </div>
       
       <ControlCantidad/>

        <div className="modal-compra__total">
          <div className="modal-compra__total-cont">
            <h3 className="modal-compra__precio-label">TOTAL:</h3>
            {productoSeleccionado && (
              <h4 className="modal-compra__precio-total">
                ${productoSeleccionado.precio}
              </h4>
            )}
          </div>
        </div>

        <div className="modal-compra__acciones">
          <button className="modal-compra__btn-agregar">
            Agregar al carrito
          </button>
          <button className="modal-compra__btn-comprar" onClick={()=> generarPago()}>Comprar ahora</button>
        </div>
      </div>
    </section>
  );
};
