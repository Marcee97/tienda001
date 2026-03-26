import React, { useEffect } from 'react'

export const Success = () => {
  useEffect(()=> {
console.log("estas en el success")
  }, [])
  return (
    <div>
        <h3>Pagaste correctamente</h3>
    </div>
  )
}
