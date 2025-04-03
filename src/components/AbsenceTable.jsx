const AbsenceTable = ({ausentismo}) => {

  return (
    <div className="absence-table">
      <h2>Ausentismo</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {ausentismo.length > 0 ? (
            ausentismo.map((absence) => (
              <tr key={absence.nombre}>
                <td>{absence.nombre}</td>
                <td>{absence.motivo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No hay ausencias registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceTable;
