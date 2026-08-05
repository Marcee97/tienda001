import { useContext, useEffect, useState } from "react";
import "../Success/success.css";
import { TiendaContext } from "../../context/TiendaContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { formatearPrecio } from "../../utils/formatearPrecios.js";

export const Success = () => {
 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentID = searchParams.get("payment_id");

  const [venta, setVenta] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!paymentID) return;

    const obtenerVenta = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/success/${paymentID}`,
        );
        if (!res.ok) throw new Error("No se pudo obtener la venta");
        const data = await res.json();
        setVenta(data);
      } catch (err) {
        console.error("Error al obtener los datos de la venta:", err);
        setError(true);
      }
    };

    obtenerVenta();
  }, [paymentID]);

  return (
    <section className="success">
      <div className="success__header">
        <span className="material-symbols-outlined success__icon">
          check_circle
        </span>
        <h3 className="success__title">¡Pedido confirmado!</h3>
        <p className="success__subtitle">
          Recibimos tu pedido y lo vamos a procesar a la brevedad.
        </p>
        <button className="success__button" onClick={() => navigate("/")}>
          Seguir comprando
        </button>
      </div>

      {error ? (
  <p className="success__error">
    No pudimos encontrar los datos de tu pedido.
  </p>
) : !venta ? (
  <p className="success__cargando">Cargando pedido...</p>
) : (
  <>
    <div className="success__card">
      <h4 className="success__card-titulo">Detalles del pedido</h4>
      <div className="success__fila">
        <span className="success__label">N° de orden</span>
        <span className="success__valor">{venta.id}</span>
      </div>
      <div className="success__fila">
        <span className="success__label">Email</span>
        <span className="success__valor">{venta.email}</span>
      </div>
      <div className="success__fila">
        <span className="success__label">Total</span>
        <span className="success__valor">
          ${formatearPrecio(venta.total)}
        </span>
      </div>
    </div>

    <div className="success__card">
      <h4 className="success__card-titulo">Envío</h4>
      <p className="success__envio-nombre">{venta.nombre}</p>
      <p className="success__envio-direccion">
        {venta.calle} {venta.numero}, {venta.ciudad}, {venta.provincia}
      </p>
      <p className="success__envio-direccion">CP {venta.codigo_postal}</p>
    </div>
  </>
)}
    </section>
  );
};