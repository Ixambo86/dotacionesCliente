import React, { useState, useEffect } from "react";
import { getUAPLeaders } from "../firebaseService";

const UAPLeadersTable = ({ dotacionUAP }) => {
  //const [leaders, setLeaders] = useState([]);

  return (
    <div className="uap-leaders-table">
      <h2>Líderes de UAP</h2>
      <table>
        <thead>
          <tr>
            <th>Líder de Calidad</th>
            <th>Líder de SHE</th>
            <th>Líder Lean</th>
            <th>Líder de Lean</th>
          </tr>

          <tr>
            {dotacionUAP.length > 0 ? (
              dotacionUAP.map((leader, id) => (

                <th className="uap-leaders-datos" key={id}>
                  <div>{leader}</div>
                </th>

              ))
            ) : (
                <td colSpan="4">No hay líderes registrados</td>
            )}
          </tr>
        </thead>    
      </table>
    </div>
  );
};

export default UAPLeadersTable;
