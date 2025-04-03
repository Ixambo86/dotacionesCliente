import React from 'react'
import { Dotaciones } from './Dotaciones';

export const Turnos = ({ turnos, dotaciones, linea }) => {

    return (
        <>
            {turnos.map((turno) => (
                <div key={turno} className="turno">
                    <h3 className="turno-title">{turno}</h3>
                    <div className="inputs">
                        <Dotaciones
                            dotaciones={dotaciones}
                            linea={linea}
                            turno={turno}
                        />

                    </div>
                </div>
            ))}


        </>
    )
}

