import React from 'react'



export const ReporteUltimosEvaluadores = ({evaluadores}) => {

    return (
        <div>
            <div>
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Evaluador</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            evaluadores.map(( { evaluador , calificacion , fecha} , index) => {
                                return (
                                    <tr key={index}>
                                        <td> {evaluador} </td>
                                        <td> {calificacion} </td>
                                        <td> {fecha} </td>                                       
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
