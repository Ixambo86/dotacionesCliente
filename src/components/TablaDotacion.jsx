import React from "react";
import { Turnos } from "./Turnos";

// const MAX_PERSONAS = 6;
// const puesto = ["Lider", "Llenadora", "Etiquetadora", "Envolvedora", "Palletizadora", "Extra"]

const TablaDotacion = ({ lineasProduccion, turnos, dotaciones }) => {
  return (
    <>
      {lineasProduccion.map((linea) => (

        <div key={linea} className="linea">
          <h2 className="linea-title">{linea}</h2>
          <Turnos
            turnos={turnos}
            dotaciones={dotaciones}
            linea={linea}
          />
        </div>
      ))}

    </>
  );
};

export default TablaDotacion;
