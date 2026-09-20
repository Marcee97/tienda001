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
 const [varianteIdPrevia, setVarianteIdPrevia] = useState(varianteId);

   if (varianteId !== varianteIdPrevia) {
    setVarianteIdPrevia(varianteId);
    setMostrarSinStock(false);
  }
  useEffect(() => {
    setMostrarSinStock(false);
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
          {max === 1 ? (
            <p classanme="selector-cantidad__sin-stock-text">Solo Queda 1</p>
          ) : (

            <p classanme="selector-cantidad__sin-stock-text">Solo Quedan {max}</p>
          )
          }
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
