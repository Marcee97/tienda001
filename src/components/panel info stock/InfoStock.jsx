import React, { useContext, useEffect, useState } from "react";
import { LiveStock } from "../live stock/LiveStock";
import "../panel info stock/infoStock.css";
import { TiendaContext } from "../../context/TiendaContext";
export const InfoStock = () => {
  const { openCloseInfoStock, setOpenCloseInfoStock } =
    useContext(TiendaContext);

  useEffect(() => {
  }, [openCloseInfoStock]);
  return (
    <section
      className={openCloseInfoStock ? "infostock__--active" : "infostock"}
    >
      <div className="infostock__cont">
        <div className="infostock-cont--info">
          <div className="infostock__cont--p">
            No hay mas stock <LiveStock stock={0} />
          </div>
          <div className="infostock__cont--p">
            Ultimas unidades <LiveStock stock={3} />
          </div>
          <div className="infostock__cont--p">
            Stock disponible <LiveStock stock={6} />
          </div>
        </div>
          <span className="material-symbols-outlined" onClick={()=> setOpenCloseInfoStock(prev => !prev)}>arrow_forward_ios</span>
      </div>
    </section>
  );
};
