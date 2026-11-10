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
              <h3>💳 ¿Cómo se realizan los pagos?</h3>
              <p>
                Los cobros se realizan automáticamente a través de{" "}
                <strong>MercadoPago</strong>, utilizando el medio de pago que
                asociás al momento de suscribirte. No necesitás realizar ninguna
                operación adicional:{" "}
                <strong>
                  Los pagos se debitan mensualmente de forma automática.
                </strong>
              </p>

              <h3>👕 Una remera cada 60 dias</h3>

              <p>
                Por cada <strong>3 pagos mensuales</strong>{" "}
                <span className="suscripcion__aclaracion">
                  (60 días en total)
                </span>
                , recibís <strong>una remera de tu elección</strong>. Una vez
                que recibís tu remera, la suscripción continúa automáticamente
                y, después de otros 60 días, recibís una nueva.
              </p>

              <h3>💰 Pagás en cuotas y te sale más barato</h3>

              <p>
                La idea es simple:{" "}
                <strong>pagás de a poco y terminás pagando menos</strong>.
              </p>

              <p>
                La diferencia de comprar la remera en un solo pago, con la
                suscripción la abonás en cuotas de{" "}
                <strong>$7.000 por mes</strong>.Y la remera se entrega una vez
                completados los 3 pagos.
                <br />
                <strong>Y te queda mas barato con la Suscripcion</strong>
              </p>

              <h3>🔄 ¿Y si quiero cancelar?</h3>

              <p>
                Podés cancelar tu suscripción{" "}
                <strong>en cualquier momento</strong>.
              </p>

              <p>
                Si decidís cancelar antes de completar los 3 pagos,{" "}
                <strong>
                  se cancela la suscripción y se te devuelve el total de los
                  pagos que hayas hecho
                </strong>
                .
              </p>

              <p>
                Por ejemplo, si llevás 2 meses pagando y todavía falta 1 pago
                para recibir la remera, podés cancelar y{" "}
                <strong>se te devuelve el total de esos 2 pagos</strong>.
              </p>

              <p>
                <strong>Sin permanencia. Sin compromisos.</strong>
              </p>
              <h3>💳 ¿Cómo me doy de Baja?</h3>
              <p>
                Para darte de baja lo haces desde la app de mercadopago: <br />
              </p>
              <div className="suscripciones__explicacion--mercadopago">
                <div className="suscripciones__explicacion--mercadopago--pasos">
                  <h3>1. Abrí el menú</h3>{" "}
                  <p>
                    Tocá el botón de menú para desplegar las opciones de
                    navegación.
                  </p>
                </div>
                <div className="suscripciones__explicacion--mercadopago--pasos">
                  <h3>2. Buscá «Suscripciones»</h3>{" "}
                  <p>
                    Deslizá hacia abajo, casi hasta el final del menú, y
                    seleccioná Suscripciones.
                  </p>
                </div>
                <div>
                  <h3>3. Cancelá tu suscripción</h3>{" "}
                  <p>
                    3. Cancelá tu suscripción Entrá en tu suscripción de Art3mia
                    y seleccioná la opción para darla de baja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="suscripciones__btn--cont">
          <button
            className="suscripciones__btn"
            onClick={() => {
              setModoCompra("suscripcion");
              setOpenCloseMenu(false);
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
