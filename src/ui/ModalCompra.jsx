import { useContext, useEffect, useState } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";
import { ControlCantidad } from "../components/ControlCantidad/ControlCantidad";

export const ModalCompra = () => {
  const [animationCompra, setAnimationCompra] = useState(false);
  const [varianteObtenida, setVarianteObtenida] = useState([]);
  const {
    productoSeleccionado,
    setProductoSeleccionado,
    talleSeleccionado,
    setTalleSeleccionado,
    cantidad,
    setCantidad,
    setProductoSeleccionadoCarrito,
    productoSeleccionadoCarrito,
    agregarAlCarrito,
    carrito,
    setOpenCloseMenu,
    setOpenCloseCarrito,
  } = useContext(TiendaContext);

  const cerrarModalCompra = () => {
    setProductoSeleccionado(null);
  };
  const talles = ["S", "M", "XL", "XXL"];

  useEffect(() => {
    console.log(productoSeleccionado, " este es el producto que se selecciono");
  }, [productoSeleccionado]);

  useEffect(() => {
    if (!productoSeleccionado) return;
    const variantesDeProducto = async () => {
      const data = await fetch("http://localhost:3000/api/variantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productoId: productoSeleccionado?.id }),
      });
      const variantesObtenidas = await data.json();
      console.log(variantesObtenidas, "Estas son las variantes obtenidas");

      const tallesOrdenados = [
        ...new Set(variantesObtenidas.map((v) => v.talle)),
      ].sort();
      setVarianteObtenida(tallesOrdenados);
    };
    variantesDeProducto();
  }, [productoSeleccionado]);

  useEffect(() => {
    console.log(varianteObtenida, "estos son los talles ordenados");
  }, [varianteObtenida]);

  //LOGICA DE PAGO-----
  const generarPago = async () => {
    const res = await fetch(
      "http://localhost:3000/api/pagos/crear-preferencia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoSeleccionado),
      },
    );
    const data = await res.json();
    console.log("se ejecuta funcion de pagos", data);
    // window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`
    console.log(
      `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`,
    );
  };
  useEffect(() => {
    if (animationCompra) {
      const timer = setTimeout(() => {
        setAnimationCompra(false);
      }, 22000);

      return () => clearTimeout(timer);
    }
  }, [animationCompra]);

  const btnOpenCarrito = () => {
    cerrarModalCompra();

  setTimeout(() => {
    setOpenCloseMenu(prev => !prev);
  }, 250);

  setTimeout(() => {
    setOpenCloseCarrito(prev => !prev);
  }, 450);
  };
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
                setCantidad(1);
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
            <p className="modal-compra__talles-label">Talle</p>
            <div className="modal-compra__cont-talles-botones">
              {varianteObtenida.map((talle) => (
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
        <div className="modal-compra__contenedor-cantidad">
          <p className="modal-compra__contenedor-label">Cantidad</p>
          <ControlCantidad value={cantidad} onChange={setCantidad} />
        </div>

        {animationCompra && (
          <div className="mensaje-agregado">
            <p className="mensaje-agregado__text">Se agregó al carrito</p>
            <h4 className="mensaje-agregado__button" onClick={btnOpenCarrito}>Ver</h4>
          </div>
        )}

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
          <button
            className="modal-compra__btn-agregar"
            onClick={() => {
              (agregarAlCarrito(
                productoSeleccionado,
                talleSeleccionado,
                cantidad,
              ),
                setAnimationCompra(true));
            }}
          >
            Agregar al carrito
          </button>
          <button
            className="modal-compra__btn-comprar"
            onClick={() => generarPago()}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </section>
  );
};
