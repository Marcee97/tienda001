import { useContext } from "react"
import "../style/menudesplegable.css"
import { TiendaContext } from "../context/TiendaContext"
export const MenuDesplegable = () => {


const {openCloseMenu, setOpenCloseMenu} = useContext(TiendaContext)


  return (
    <section className={openCloseMenu ? "menu-desplegable-active" : "menu-desplegable"} onClick={()=> setOpenCloseMenu(prev => !prev)}>
      <h2 className="menu-desplegable-title">VALLEY</h2>
        <div className="menu-desplegable-cont">
            <ul className="menu-desplegable-lista">
                 <span className={"material-symbols-outlined menu-desplegable-icon-close"}>
close
</span>
                <li className="menu-desplegable-item">Sobre Nosotros</li>
                <li className="menu-desplegable-item">Ubicacion</li>
                <li className="menu-desplegable-item">Como Funciona</li>
                <li className="menu-desplegable-item">Sitio Web</li>
            </ul>
        </div>
    </section>
  )
}
