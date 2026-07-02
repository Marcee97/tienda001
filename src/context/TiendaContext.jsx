import { createContext, useEffect, useState } from "react";

export const TiendaContext = createContext();

export const TiendaProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(false);
  const [openCloseMenu, setOpenCloseMenu] = useState(false);
  const [openCloseCarrito, setOpenCloseCarrito] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [animationCompra, setAnimationCompra] = useState(false);
  const [openCloseModalCompra, setOpenCloseModalCompra] = useState(false);
  const [openCloseEnvios, setOpenCloseEnvios] = useState(false);
  const [openCloseInfoStock, setOpenCloseInfoStock] = useState(false);
  const [openCloseGuiaTalles, setOpenCloseGuiaTalles] = useState(false);
  const [visibilidadTitle, setVisibilidadTitle] = useState(false);

  const [productoSeleccionadoCarrito, setProductoSeleccionadoCarrito] =
    useState([]);

  const [carrito, setCarrito] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  const agregarAlCarrito = (
    producto,
    talle,
    cantidad,
    color,
    imagen,
    stock,
  ) => {
    console.log(stock, "este deberia ser el stock para el carrito");
    if (!talle) return console.log("selecciona un talle");
    console.log(cantidad, "la cantida de compra en context");

    setCarrito((prev) => {
      const existe = prev.find(
        (item) =>
          item.id === producto.id &&
          item.talle === talle &&
          item.color === color,
      );
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id &&
          item.talle === talle &&
          item.color === color
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }
      setAnimationCompra(true);
      return [...prev, { ...producto, talle, cantidad, color, imagen, stock }];
    });
  };

  const cambiarCantidad = (id, talle, color, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.talle === talle && item.color === color
          ? { ...item, cantidad: nuevaCantidad }
          : item,
      ),
    );
  };

  const ejecutarCompraCarrito = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/pagos/crear-preferencia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ carrito }),
        },
      );
    } catch (error) {
      console.error("error de compra", error);
    }
  };

  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    calle: "",
    numero: "",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    email: "",
  });

  const guiaTalles = () => {
    console.log("messi");
  };
  return (
    <TiendaContext.Provider
      value={{
        productoSeleccionado,
        setProductoSeleccionado,
        openCloseMenu,
        setOpenCloseMenu,
        openCloseCarrito,
        setOpenCloseCarrito,
        talleSeleccionado,
        setTalleSeleccionado,
        cantidad,
        setCantidad,
        carrito,
        agregarAlCarrito,
        cambiarCantidad,
        ejecutarCompraCarrito,
        colorSeleccionado,
        setColorSeleccionado,
        animationCompra,
        setAnimationCompra,
        openCloseModalCompra,
        setOpenCloseModalCompra,
        openCloseEnvios,
        setOpenCloseEnvios,
        openCloseInfoStock,
        setOpenCloseInfoStock,
        datosFormulario,
        setDatosFormulario,
        openCloseGuiaTalles,
        setOpenCloseGuiaTalles,
        visibilidadTitle,
        setVisibilidadTitle,
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};
