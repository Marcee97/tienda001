import React, { useEffect } from "react";
import "../live stock/livestock.css";
import {TiendaContext} from "../../context/TiendaContext";
import {useContext} from "react";
export const LiveStock = ({stock, onClick}) => {

useEffect(() => {
console.log("Stock actualizado:", stock);
} ,[stock])

 const color = stock > 4 ? "green" : stock > 0 ? "orange" : "white";
  return (
    <div className="live-indicator" onClick={onClick}>
      <span className="live-indicator__punto" style={{ backgroundColor: color }}></span>
    </div>
  );
};
