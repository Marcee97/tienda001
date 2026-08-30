import { useContext, useState } from "react";
import "../style/suscripcion.css";
import { TiendaContext } from "../context/TiendaContext";

export const Suscripciones = () => {
  const {
    modoCompra,
    setModoCompra,
    productoSuscripcion,
    setProductoSuscripcion,
    openCloseSuscripciones,
    setOpenCloseSuscripciones,
    setOpenCloseModalCompra,
    openCloseMenu,
    setOpenCloseMenu,
  } = useContext(TiendaContext);
  const [mostrar, setMostrar] = useState(false);
  return (
    <section
      className={`suscripciones ${openCloseSuscripciones ? "suscripciones__active" : ""}`}
    >
      <div className="suscripciones_cont">
        <div className="suscripciones_cabezera">
          <h4>Suscripcion</h4>
          <span
            className={"material-symbols-outlined menu-desplegable-icons"}
            onClick={() => setOpenCloseSuscripciones((prev) => !prev)}
          >
            close
          </span>
        </div>
        <div className="suscripcion__img---cont">
          <img
            src="\In no time-amico.svg"
            alt="svg de suscripcion"
            className="suscripcion__svg--main"
          />
          <ul className="suscripciones__list">
            <li className="suscripciones_li">
              <img
                src="\check-svgrepo-com (1).svg"
                alt="SVG check"
                className="suscripciones_list--check"
              />
              <span>Pagas menos</span>
            </li>
            <li className="suscripciones_li">
              <img
                src="\check-svgrepo-com (1).svg"
                alt="SVG check"
                className="suscripciones_list--check"
              />
              <span>Te suscribís una vez y listo</span>
            </li>
            <li className="suscripciones_li">
              <img
                src="\check-svgrepo-com (1).svg"
                alt="SVG check"
                className="suscripciones_list--check"
              />
              <span>Cancelás cuando quieras</span>
            </li>
            <li className="suscripciones_li">
              <img
                src="\check-svgrepo-com (1).svg"
                alt="SVG check"
                className="suscripciones_list--check"
              />
              <span>Recibís tu remera en casa</span>
            </li>
          </ul>
        </div>
        <div>
          <p
            onClick={() => setMostrar(!mostrar)}
            className="suscripciones__btn--como-funciona"
          >
            <strong>¿Como funciona?</strong>
          </p>
        </div>

        <div
          className={`suscripciones__cont--explicacion ${
            mostrar ? "suscripciones__cont--explicacion--activa" : ""
          }`}
        >
          <span
            className="material-symbols-outlined suscripciones__btn--cerrar"
            onClick={() => setMostrar(false)}
          >
            close
          </span>

          <div className="suscripciones__scroll">
            <div className="suscripciones__explicacion">
              <h1>¿Cómo funciona la suscripción?</h1>

              <p>
                Elegís la remera que querés, tu talle y color, y te suscribís
                por <strong>$7.000 al mes</strong>.
              </p>

              <h3>👕 Una remera cada 3 meses</h3>

              <p>
                Por cada <strong>3 pagos mensuales</strong>, recibís{" "}
                <strong>una remera de tu elección</strong>. Una vez que recibís
                tu remera, la suscripción continúa automáticamente y, después de
                otros 3 meses, recibís una nueva.
              </p>

              <p>
                Podés seguir eligiendo la misma remera o{" "}
                <strong>cambiar el talle o color cuando quieras</strong>.
              </p>

              <h3>💰 Pagás en cuotas y te sale más barato</h3>

              <p>
                La idea es simple:{" "}
                <strong>pagás de a poco y terminás pagando menos</strong>.
              </p>

              <p>
                En lugar de comprar la remera en un solo pago, con la
                suscripción la abonás en cuotas de{" "}
                <strong>$7.000 por mes</strong>. La única diferencia es que la
                remera se entrega una vez completados los 3 pagos.
              </p>

              <p>
                <strong>
                  Es decir: pagás menos, pero tenés que esperar 3 meses para
                  recibirla.
                </strong>
              </p>

              <h3>🔄 ¿Y si quiero cancelar?</h3>

              <p>
                Podés cancelar tu suscripción{" "}
                <strong>en cualquier momento</strong>.
              </p>

              <p>
                Si decidís cancelar antes de completar los 3 meses,{" "}
                <strong>
                  se cancela la suscripción y se te devuelve el total de lo que
                  hayas pagado hasta ese momento
                </strong>
                .
              </p>

              <p>
                Por ejemplo, si llevás 2 meses pagando y todavía falta 1 mes
                para recibir la remera, podés cancelar y{" "}
                <strong>se te devuelve el total de esos 2 pagos</strong>.
              </p>

              <p>
                <strong>Sin permanencia. Sin compromisos.</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="suscripciones__btn--cont">
          <button
            className="suscripciones__btn"
            onClick={() => {
              setModoCompra("suscripcion");
              setOpenCloseMenu(false)
              setOpenCloseSuscripciones(false);
              setOpenCloseModalCompra(true); // abre el mismo ModalCompra que ya usás
            }}
          >
            Suscribirme por{" "}
            <span className="suscripciones__btn--precio">$7.000/mes</span>
          </button>
        </div>
      </div>
    </section>
  );
};
