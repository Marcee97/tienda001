import React, { useContext, useEffect, useState } from "react";
import "../Success/success.css";
import { TiendaContext } from "../../context/TiendaContext";
import { useSearchParams, useNavigate } from "react-router-dom";
export const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("estas en el success");
  }, []);

  const [searchParams] = useSearchParams();
   const [venta, setVenta] = useState(null);
  const paymentID = searchParams.get("payment_id");
  console.log(paymentID, "este es el paymentID que se esta enviando al success desde los PARAMS");
useEffect(() => {
  if(!paymentID) return;
try{

  const data = fetch(`import.meta.env.VITE_API_URL}/api/success/${paymentID}`)
  console.log(data, "estos son los datos que se estan enviando al al success desde los PARAMS");
}catch(error) {
  console.error("Error al obtener los datos de la venta:", error)
}
}, [paymentID]);
  
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
        {venta ? (
          <>
            <p className="success__text">
              Total: <span className="success__price">${venta.total}</span>
            </p>
            <div className="success__cont--email">
              <p className="success__text">
                Te enviamos un email a
                <span className="success__email"> {venta.email}</span>
              </p>
            </div>
            <div className="success__cont--orden">
              <p className="success__orden">Tu número de orden: {venta.id}</p>
            </div>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <button className="success__button" onClick={() => navigate("/")}>
        Volver Al Hom
      </button>
    </section>
  );
};
