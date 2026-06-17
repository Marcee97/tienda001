import "../SelectorCantidad/selectorCantidad.css";


export const SelectorCantidad = ({ cantidad, setCantidad, max = 10 }) => {
  const restar = () => setCantidad((prev) => Math.max(1, prev - 1));
  const sumar = () => setCantidad((prev) => Math.min(max, prev + 1));

  return (
    <div className="selector-cantidad">
      <button
        className="selector-cantidad__btn"
        onClick={restar}
        disabled={cantidad === 1}
      >
        −
      </button>
      <span className="selector-cantidad__numero">{cantidad}</span>
      <button
        className="selector-cantidad__btn"
        onClick={sumar}
        disabled={cantidad === max}
      >
        +
      </button>
    </div>
  );
};