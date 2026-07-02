import { useContext, useEffect, useState, useRef } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";
import { traduccionColores } from "../archivos/diccionarioIngles.js";
import { Carrousel } from "../components/Carrousel.jsx";
import { LiveStock } from "../components/live stock/LiveStock.jsx";
import { SelectorCantidad } from "../components/SelectorCantidad/SelectorCantidad.jsx";
import { InfoStock } from "../components/panel info stock/InfoStock.jsx";
import { Chatbot } from "../components/chatbot/Chatbot.jsx";
import { GuiaTalles } from "../components/guiaTalles/GuiaTalles.jsx";
import { Carrito } from "./Carrito.jsx";
import { MenuDesplegable } from "./MenuDesplegable.jsx";

export const ModalCompra = () => {
  const [variantes, setVariantes] = useState([]);

  const {
    productoSeleccionado,
    setProductoSeleccionado,
    talleSeleccionado,
    setTalleSeleccionado,
    cantidad,
    setCantidad,
    setProductoSeleccionadoCarrito,
    productoSeleccionadoCarrito,
    agregarAlCarrito,
    setOpenCloseMenu,
    setOpenCloseCarrito,
    colorSeleccionado,
    setColorSeleccionado,
    animationCompra,
    setAnimationCompra,
    cerrarModalCompra,
    openCloseModalCompra,
    setOpenCloseModalCompra,
    openCloseInfoStock,
    setOpenCloseInfoStock,
    openCloseGuiaTalles,
    setOpenCloseGuiaTalles,
  } = useContext(TiendaContext);

  const [indexImagenCarrousel, setIndexImagenCarrousel] = useState(0);
  const [openChatbot, setOpenChatbot] = useState(false);
  const inputChatRef = useRef(null);

  const mensajesEndRef = useRef(null);

  useEffect(() => {}, [openCloseInfoStock]);
  useEffect(() => {
    if (!openCloseModalCompra) return;

    const variantesDeProducto = async () => {
      const data = await fetch(
        `${import.meta.env.VITE_API_URL}/api/variantes/${productoSeleccionado.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const variantesObtenidas = await data.json();
      setVariantes(variantesObtenidas);
    };
    variantesDeProducto();
  }, [openCloseModalCompra]);

  useEffect(() => {
    if (animationCompra) {
      const timer = setTimeout(() => {
        setAnimationCompra(false);
      }, 22000);

      return () => clearTimeout(timer);
    }
  }, [animationCompra]);

  const btnOpenCarrito = () => {
    if (talleSeleccionado === null) return;
    
  setOpenCloseModalCompra(true);

    setTimeout(() => {
      setOpenCloseMenu(true);
    }, 250);

    setTimeout(() => {
      setOpenCloseCarrito(true);
    }, 450);
  };
  const [mensajes, setMensajes] = useState([]);
  const [inputChat, setInputChat] = useState("");

  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);
  const enviarMensaje = async () => {
    if (!inputChat.trim()) return;

    const mensajeUsuario = { role: "user", texto: inputChat };
    setMensajes((prev) => [...prev, mensajeUsuario]);
    setInputChat("");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/chatbot`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: inputChat }),
      },
    );

    const data = await response.json();
    setMensajes((prev) => [...prev, { role: "bot", texto: data.respuesta }]);
  };
  //------------------ LOGICA DE SELECCION DE VARIANTES (COLORES TALLES Y STOCK)------------------
  const colores = variantes.reduce((acc, item) => {
    const existe = acc.some((c) => c.color_id === item.color_id);
    if (!existe) {
      acc.push({
        color_id: item.color_id,
        color: item.color,
      });
    }

    return acc;
  }, []);

  useEffect(() => {
    if (colores.length > 0 && !colorSeleccionado) {
      setColorSeleccionado(colores[0].color_id);
    }
  }, [colores]);

  const tallesFiltrados = variantes.filter(
    (v) => v.color_id === colorSeleccionado,
  );

  const imagenesPorColor = variantes.reduce((acc, item) => {
    if (!acc[item.color_id]) {
      acc[item.color_id] = [];
    }

    if (!acc[item.color_id].includes(item.url)) {
      acc[item.color_id].push(item.url);
    }

    return acc;
  }, {});

  const imagenesActuales = imagenesPorColor[colorSeleccionado] || [];

  const tallesUnicos = tallesFiltrados.filter(
    (item, index, self) =>
      index === self.findIndex((v) => v.talle === item.talle),
  );
  const varianteSeleccionada = variantes.find(
    (v) => v.color_id === colorSeleccionado && v.talle === talleSeleccionado,
  );

  const abrirChatbot = () => {
    setOpenChatbot(true);
    inputChatRef.current?.focus();
  };
  return (
    <section
      className={
        openCloseModalCompra
          ? "modal-compra modal-compra--active"
          : "modal-compra"
      }
    >
      <MenuDesplegable/>
      <Carrito/>
      <div className="modal-compra__cont">
        <div className="modal-compra__contenedor">
          <div className="modal-compra__titulo-contenedor">
            <span
              className="material-symbols-outlined modal-compra__titulo-contenedor--retoceder"
              onClick={() => {
                cerrarModalCompra();
                setTalleSeleccionado(null);
                setCantidad(1);
              }}
            >
              reply
            </span>
          </div>
        </div>
        <div className="cont__carrousel--guiatalles">
          <Carrousel imagenes={imagenesActuales} />

          <GuiaTalles
            visible={openCloseGuiaTalles}
            medidas={{
              NONE: {
                hombro: "Selecciona",
                pecho: "0 cm",
                largo: "0 cm",
                manga: "0 cm",
              },
              S: {
                hombro: "42 cm",
                pecho: "96 cm",
                largo: "68 cm",
                manga: "20 cm",
              },
              M: {
                hombro: "44 cm",
                pecho: "100 cm",
                largo: "70 cm",
                manga: "21 cm",
              },
              L: {
                hombro: "46 cm",
                pecho: "106 cm",
                largo: "72 cm",
                manga: "22 cm",
              },
              XL: {
                hombro: "48 cm",
                pecho: "75 cm",
                largo: "74 cm",
                manga: "23 cm",
              },
              XXL: {
                hombro: "48 cm",
                pecho: "75 cm",
                largo: "74 cm",
                manga: "23 cm",
              }
            }}
            talle={talleSeleccionado || "NONE"}
          />
        </div>

        <div className="modal-compra__info">
          <InfoStock />
          <div className="modal-compra__cont-titulo-chatbot">
            <h4 className="modal-compra__titulo">{variantes[0]?.nombre}</h4>
            <h4
              onClick={() => abrirChatbot()}
              className="modal-compra__btn-chat"
            >
              IA
            </h4>
          </div>
          <div className="modal-compra__colores-talles">
            <h4>Colores</h4>
            <div className="modal-compra__contenedor-btn-colores">
              <div className="modal-compra__cont-btn-colores">
                {colores.map((c) => (
                  <button
                    key={c.color_id}
                    className={`modal-compra__color-btn ${
                      colorSeleccionado === c.color_id ? "active" : ""
                    }`}
                    style={{
                      backgroundColor:
                        traduccionColores[c.color?.toLowerCase()],
                    }}
                    onClick={() => {
                      setColorSeleccionado(c.color_id);
                      setTalleSeleccionado(null);
                      console.log(
                        talleSeleccionado,
                        " este es el talle seleccionado",
                      );
                      setIndexImagenCarrousel(0);
                      setCantidad(1);
                    }}
                  ></button>
                ))}
              </div>
              <h4 className="modal-compra__precio">${variantes[0]?.precio}</h4>
            </div>
          </div>
          <div className="modal-compra__talles">
            <div className="modal-compra__talles-botones">
              <div className="modal-compra__cont-talles-botones">
                {tallesUnicos
                  .filter((t) => t.stock > 0)
                  .map((v, index) => (
                    <button
                      key={index}
                      className={`modal-compra__talle-btn ${
                        talleSeleccionado === v.talle ? "active" : ""
                      }`}
                      onClick={() => {
                        setTalleSeleccionado(v.talle);
                        setCantidad(1);
                      }}
                    >
                      {v.talle}
                    </button>
                  ))}
              </div>
              <div className="modal--compra__cont__guiatalles">
                <p
                  className="modal--compra__cont__guiatalles--mensage"
                  style={{
                    visibility:
                      openCloseGuiaTalles && !talleSeleccionado
                        ? "visible"
                        : "hidden",
                  }}
                >
                  Elegí un talle para ver medidas
                </p>

                <span
                  class="material-symbols-outlined modal--compra__cont__guiatalles--btn"
                  onClick={() => setOpenCloseGuiaTalles((prev) => !prev)}
                >
                  settings_accessibility
                </span>
              </div>
            </div>
          </div>
          <div className="modal-compra__contenedor-cantidad">
            <div className="modal-compra__stock">
              <SelectorCantidad
                cantidad={cantidad}
                setCantidad={setCantidad}
                max={varianteSeleccionada?.stock}
              />
              <LiveStock
                stock={varianteSeleccionada?.stock}
                onClick={() => {
                  setOpenCloseInfoStock((prev) => !prev);
                }}
              />
            </div>
          </div>
          {animationCompra && (
            <div className="mensaje-agregado">
              <p className="mensaje-agregado__text">Se agregó al carrito</p>
              <h4 className="mensaje-agregado__button" onClick={btnOpenCarrito}>
                Ver
              </h4>
            </div>
          )}
          <div
            className={
              cantidad > 1
                ? "modal-compra__total"
                : "modal-compra__total--active"
            }
          >
            <div className="modal-compra__total-cont">
              <h3 className="modal-compra__precio-label">TOTAL:</h3>
              {variantes && (
                <h4 className="modal-compra__precio-total">
                  ${variantes[0]?.precio * cantidad}
                </h4>
              )}
            </div>
          </div>

          <div className="modal-compra__acciones">
            <button
              className="modal-compra__btn-agregar"
              onClick={() => {
                const producto = {
                  id: variantes[0]?.producto_id,
                  nombre: variantes[0]?.nombre,
                  precio: variantes[0]?.precio,
                };
                agregarAlCarrito(
                  producto,
                  talleSeleccionado,
                  cantidad,
                  colorSeleccionado,
                  imagenesActuales[0],
                  varianteSeleccionada.stock,
                );
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        <Chatbot open={openChatbot} onClose={() => setOpenChatbot(false)} />
      </div>
    </section>
  );
};
