import React from 'react'

export const ComboEvaluadores = ({evaluadores}) => {

    return (
        <>
            <select defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled> Escoga un evaluador </option>
                     {evaluadores.map((items, index) => {
                    return ( <option key={index} value={items.nombre}> {items.nombre} </option> );
                    })
                    };
            </select>
        </>
    )
}
