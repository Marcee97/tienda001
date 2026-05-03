import { createContext, useEffect, useState } from "react";

export const TiendaContext = createContext();

export const TiendaProvider = ({ children }) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [openCloseMenu, setOpenCloseMenu] = useState(false);
  const [openCloseCarrito, setOpenCloseCarrito] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [productoSeleccionadoCarrito, setProductoSeleccionadoCarrito] =
    useState([]);

    const [carrito, setCarrito] = useState([])
  const [cantidad, setCantidad] = useState(1);


const agregarAlCarrito = (producto, talle, cantidad) => {
  
setCarrito(prev => {
  const existe = prev.find(
    item => item.id === producto.id && item.talle === talle
  );
  if(existe) {
    return prev.map(item =>
      item.id === producto.id && item.talle === talle 
      ? {...item, cantidad: item.cantidad + cantidad}
      : item
    );
  }
  return [...prev, {...producto, talle, cantidad}]
})

}

const cambiarCantidad = (id, talle, nuevaCantidad) => {
  setCarrito(prev =>
    prev.map(item =>
      item.id === id && item.talle === talle
        ? { ...item, cantidad: nuevaCantidad }
        : item
    )
  );
};

const ejecutarCompraCarrito = async() => {
  try{

    const res = await fetch("http://localhost:3000/api/pagos/crear-preferencia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ carrito })
    });

  }catch (error) {
    console.error("error de compra", error)
  }
  }
  
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
        ejecutarCompraCarrito
      
      }}
    >
      {children}
    </TiendaContext.Provider>
  );
};
