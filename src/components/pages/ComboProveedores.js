import React from 'react'

export const ComboProveedores = ({proveedores}) => {


    return (
        <>
            <select defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled> Escoga un proveedor </option>
                     {proveedores.map((items, index) => {
                               return ( 
                               <option key={index} value={items.nombre}> {items.nombre} </option>
                               );
                    })
                };
            </select>
        </>
    )
}
