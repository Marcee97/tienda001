import "./ControlCantidad.css";

export const ControlCantidad = ({ value, onChange, min = 1 }) => {
  return (
    <div className="cantidad">
      <div className="cantidad__control">
        <button
          className="cantidad__btn"
          onClick={(e) => {
            e.stopPropagation();
            onChange(Math.max(min, value - 1));
          }}
        >
          -
        </button>

        <input
          className="cantidad__input"
          type="number"
          value={value}
          onChange={(e) => {
            e.stopPropagation();
            onChange(Number(e.target.value));
          }}
        />

        <button
          className="cantidad__btn"
          onClick={(e) => {
            e.stopPropagation();
            onChange(value + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
