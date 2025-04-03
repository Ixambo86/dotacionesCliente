import React from "react";

// const MAX_PERSONAS = 6;
// const puesto = ["Lider", "Llenadora", "Etiquetadora", "Envolvedora", "Palletizadora", "Extra"]

const TablaDotacion = ({ lineas, turnos, dotaciones }) => {
  return (
    <table className="dotacion-table">
      <thead>
        <tr>
          <th>Turno</th>
          {lineas.map((linea, index) => (
            <th key={index}>{linea}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {turnos.map((turno, index) => (
          <tr key={index}>
            <td className="turno">{turno}</td>
            {lineas.map((linea, i) => (
              <td key={i} className="dotacion-cell">
                {dotaciones[linea][turno].map((persona, index) => (
                  <div key={index}>
                    {persona}
                  </div>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaDotacion;
