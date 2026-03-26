import { createContext, useState } from "react";

export const TiendaContext = createContext();

export const TiendaProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [openCloseMenu, setOpenCloseMenu] = useState(false);
  const [openCloseCarrito, setOpenCloseCarrito] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

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
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};
