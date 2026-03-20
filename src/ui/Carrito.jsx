import React from 'react'
import "../style/carrito.css"
export const Carrito = () => {
  return (
    <section className='carrito'>
        <span
            className={"material-symbols-outlined carrito__icon-close"}
          >
            close
          </span>
        <div className='carrito-cont'>
    <p>Aca iria el Carrito</p>
        </div>
    </section>
  )
}
