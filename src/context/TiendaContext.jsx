import { createContext, useState } from "react";

export const TiendaContext = createContext();

export const TiendaProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [openCloseMenu, setOpenCloseMenu] = useState(false);
  const [openCloseCarrito, setOpenCloseCarrito] = useState(false);

  return (
    <TiendaContext.Provider
      value={{
        productoSeleccionado,
        setProductoSeleccionado,
        openCloseMenu,
        setOpenCloseMenu,
        openCloseCarrito,
        setOpenCloseCarrito,
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};
