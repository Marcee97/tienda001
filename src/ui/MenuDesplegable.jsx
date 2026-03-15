import "../style/menudesplegable.css"
export const MenuDesplegable = () => {
  return (
    <section className="menu-desplegable">
      <h2 className="menu-desplegable-title">VALLEY</h2>
        <div className="menu-desplegable-cont">
            <ul className="menu-desplegable-lista">
                 <span class="material-symbols-outlined">
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
