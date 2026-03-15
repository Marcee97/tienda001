import { TiendaProvider } from "./context/TiendaContext"
import "./style/app.css"
import { Catalogo } from "./ui/Catalogo"
import { Introduccion } from "./ui/Introduccion"
import { Menu } from './ui/Menu'
import { ModalCompra } from "./ui/ModalCompra"

export const App = () => {
  return (
    
    <section className='app'>
      <TiendaProvider>
    <Menu/>
    <Introduccion/>
    <Catalogo/>
    <ModalCompra/>
    </TiendaProvider>
    </section>
  )
}
