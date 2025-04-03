import React from 'react';

export const Dotaciones = ({ dotaciones, linea, turno, }) => {

    return (
        <>
            {
                dotaciones[linea][turno].map((persona, index) => (
                    <div key={index} className='input'>
                        {persona}
                    </div>
                ))
            }
        </>
    );
};
