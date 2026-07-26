import "../components/carrousel.css";
import { useContext, useState, useRef } from "react";
import { TiendaContext } from "../context/TiendaContext";
export const Carrousel = ({ imagenes }) => {

  const {index, setIndex} = useContext(TiendaContext)
 const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const anterior = () => setIndex(prev => prev > 0 ? prev - 1 : prev);
  const siguiente = () => setIndex(prev => prev < imagenes.length - 1 ? prev + 1 : prev);


    const manejarTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const manejarTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const manejarTouchEnd = () => {
    const distancia = touchStartX.current - touchEndX.current;
    const umbralMinimo = 50; // px mínimos para considerarlo un swipe intencional

    if (distancia > umbralMinimo) {
      siguiente();
    } else if (distancia < -umbralMinimo) {
      anterior();
    }
  };
  return (
    <div className="carrousel">
      <div
        className="carrousel__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
         onTouchStart={manejarTouchStart}
        onTouchMove={manejarTouchMove}
        onTouchEnd={manejarTouchEnd}
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