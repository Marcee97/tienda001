import { useState, useEffect } from "react";
import "../SelectorCantidad/selectorCantidad.css";
export const SelectorCantidad = ({
  cantidad,
  setCantidad,
  max = 10,
  disabled = false,
  varianteId,
}) => {
  const [intentoExtra, setIntentoExtra] = useState(0);
  const [mostrarSinStock, setMostrarSinStock] = useState(false);
  useEffect(() => {
    setMostrarSinStock(false);
    console.log(varianteId);
  }, [varianteId]);
  const restar = (e) => {
    e.stopPropagation();
    setCantidad(Math.max(1, cantidad - 1));
  };
  const sumar = (e) => {
    e.stopPropagation();
    if (cantidad === max) {
      setMostrarSinStock(true);
      setIntentoExtra((prev) => prev + 1);
      return;
    }
    setCantidad(Math.min(max, cantidad + 1));
  };

  return (
    <section>
      {mostrarSinStock && (
        <div
          className="selector-cantidad__sin-stock"
          key={`${cantidad}-${intentoExtra}`}
        >
          <p classanme="selector-cantidad__sin-stock-text">No hay mas</p>
        </div>
      )}

      <div className="selector-cantidad">
        <button
          className="selector-cantidad__btn"
          onClick={restar}
          disabled={disabled || cantidad === 1}
        >
          −
        </button>
        <span className="selector-cantidad__numero">{cantidad}</span>
        <button
          className="selector-cantidad__btn"
          onClick={sumar}
          disabled={disabled}
        >
          +
        </button>
      </div>
    </section>
  );
};
