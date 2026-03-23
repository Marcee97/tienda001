import { useEffect, useState } from "react"
import "../style/introduccion.css"

export const Introduccion = () => {

 const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Ajustá este valor según cuándo querés que desaparezca
      const maxScroll = 300;

      let newOpacity = 1 - scrollTop / maxScroll;

      // Evitar valores fuera de rango
      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 1) newOpacity = 1;

      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="introduccion">
        <div className="introduccion__container">
            <div className="introduccion__objetivo" style={{opacity}}>
                <h4 className="introduccion__objetivo--title">Objetivo</h4>
                <p className="introduccion__objetivo--parrafo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ea reprehenderit veritatis nemo ab accto.</p>
            </div>
            <p className="introduccion__container--text" style={{opacity}}>
            [ Scroll Para avanzar ]
            </p>
        </div>
    </section>
  )
}
