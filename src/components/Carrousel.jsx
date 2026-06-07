import "../components/carrousel.css";
import { useState } from "react";
export const Carrousel = ({ imagenes }) => {
  const [index, setIndex] = useState(0);

  const anterior = () => setIndex(prev => prev > 0 ? prev - 1 : prev);
  const siguiente = () => setIndex(prev => prev < imagenes.length - 1 ? prev + 1 : prev);

  return (
    <div className="carrousel">
      <div
        className="carrousel__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {imagenes.map((img, i) => (
          <img
            key={i}
            src={img}
            className="carrousel__imagen"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <div className="carrousel__controles">
        <span
          className="material-symbols-outlined carrousel__btn"
          onClick={anterior}
        >
          arrow_back_ios
        </span>
        <span
          className="material-symbols-outlined carrousel__btn"
          onClick={siguiente}
        >
          arrow_forward_ios
        </span>
      </div>
    </div>
  );
};