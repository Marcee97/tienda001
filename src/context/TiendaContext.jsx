import { createContext, useState } from "react"

export const TiendaContext = createContext()

export const TiendaProvider = ({ children }) => {

  const [productoSeleccionado, setProductoSeleccionado] = useState([])

  return (
    <TiendaContext.Provider
      value={{
        productoSeleccionado,
        setProductoSeleccionado
      }}
    >
      {children}
    </TiendaContext.Provider>
  )
}