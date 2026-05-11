import { useContext, useEffect, useState } from "react";
import "../style/modalcompra.css";
import { TiendaContext } from "../context/TiendaContext";
import { ControlCantidad } from "../components/ControlCantidad/ControlCantidad";

export const ModalCompra = () => {
  const [animationCompra, setAnimationCompra] = useState(false);
  const [variantes, setVariantes] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
 
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
  } = useContext(TiendaContext);

  const [indexImagenCarrousel, setIndexImagenCarrousel] = useState(0);
  const cerrarModalCompra = () => {
    setProductoSeleccionado(null);
  };

  useEffect(() => {
    console.log(
      productoSeleccionado,
      "este es el producto seleccionado en el catalogo",
    );
    if (!productoSeleccionado) return;
    console.log(productoSeleccionado.id, "el id para el modal");
    const variantesDeProducto = async () => {
      const data = await fetch(
        `http://localhost:3000/api/variantes/${productoSeleccionado?.id}`,
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
  }, [productoSeleccionado]);
 
  useEffect(() => {
    if (animationCompra) {
      const timer = setTimeout(() => {
        setAnimationCompra(false);
      }, 22000);

      return () => clearTimeout(timer);
    }
  }, [animationCompra]);

  const btnOpenCarrito = () => {
    cerrarModalCompra();

    setTimeout(() => {
      setOpenCloseMenu((prev) => !prev);
    }, 250);

    setTimeout(() => {
      setOpenCloseCarrito((prev) => !prev);
    }, 450);
  };
//------------------ LOGICA DE SELECCION DE VARIANTES (COLORES Y TALLES)------------------
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
    index === self.findIndex(v => v.talle === item.talle)
);


  return (
    <section
      className={
        productoSeleccionado
          ? "modal-compra modal-compra--active"
          : "modal-compra"
      }
    >
      <div className="modal-compra__cont">
        {productoSeleccionado && (
          <div className="modal-compra__contenedor">
            <span
              className="modal-compra__icon-cerrar material-symbols-outlined"
              onClick={() => {
                cerrarModalCompra();
                setTalleSeleccionado(null);
                setCantidad(1);
              }}
            >
              close
            </span>

            <div className="modal-compra__galeria">
              <div
                className="modal-compra__galeria-carrousel"
                style={{
                  transform: `translateX(-${indexImagenCarrousel * 104}%)`,
                  transition: "transform 0.3s ease",
                }}
              >
                {imagenesActuales.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="modal-compra__miniatura"
                    onClick={() => setIndexImagenCarrousel(i)}
                  />
                ))}
              </div>
              <div className="modal-compra__botonera-carrousel">
                <button
                  onClick={() =>
                    setIndexImagenCarrousel((prev) =>
                      prev > 0 ? prev - 1 : prev,
                    )
                  }
                >
                  ◀
                </button>

                <button
                  onClick={() =>
                    setIndexImagenCarrousel((prev) =>
                      prev < imagenesActuales.length - 1 ? prev + 1 : prev,
                    )
                  }
                >
                  ▶
                </button>
              </div>
            </div>

            <h4 className="modal-compra__titulo">
              {productoSeleccionado.nombre}
            </h4>

            <p className="modal-compra__precio">
              ${productoSeleccionado.precio}
            </p>
          </div>
        )}
        <div>
          <h4>Colores</h4>
          <div className="modal-compra__contenedor-btn-colores">
            {colores.map((c) => (
              <button
                key={c.color_id}
  className={`modal-compra__color-btn ${
    colorSeleccionado === c.color_id ? "active" : ""
  }`}
  style={{ backgroundColor: c.color?.toLowerCase() }}
  onClick={() => {
    setColorSeleccionado(c.color_id);
    setTalleSeleccionado(null);
    setIndexImagenCarrousel(0);
  }}
              >
                {c.color}
              </button>
            ))}
          </div>
        </div>

        <div className="modal-compra__talles">
          <div className="modal-compra__talles-botones">
            <p className="modal-compra__talles-label">Talle</p>
            <div className="modal-compra__cont-talles-botones">
             {tallesUnicos.map((v, index) => (
  <button
    key={index}
    className={`modal-compra__talle-btn ${
      talleSeleccionado === v.talle ? "active" : ""
    }`}
    onClick={() => setTalleSeleccionado(v.talle)}
  >
    {v.talle}
  </button>
))}
            </div>
          </div>
        </div>
        <div className="modal-compra__contenedor-cantidad">
          <p className="modal-compra__contenedor-label">Cantidad</p>
          <ControlCantidad value={cantidad} onChange={setCantidad} />
        </div>

        {animationCompra && (
          <div className="mensaje-agregado">
            <p className="mensaje-agregado__text">Se agregó al carrito</p>
            <h4 className="mensaje-agregado__button" onClick={btnOpenCarrito}>
              Ver
            </h4>
          </div>
        )}

        <div className="modal-compra__total">
          <div className="modal-compra__total-cont">
            <h3 className="modal-compra__precio-label">TOTAL:</h3>
            {productoSeleccionado && (
              <h4 className="modal-compra__precio-total">
                ${productoSeleccionado.precio}
              </h4>
            )}
          </div>
        </div>
        <div className="modal-compra__acciones">
          <button
            className="modal-compra__btn-agregar"
            onClick={() => {
              (agregarAlCarrito(
                productoSeleccionado,
                talleSeleccionado,
                cantidad,
              ),
                setAnimationCompra(true));
            }}
          >
            Agregar al carrito
          </button>
          <button
            className="modal-compra__btn-comprar"
            onClick={() => generarPago()}
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </section>
  );
};
