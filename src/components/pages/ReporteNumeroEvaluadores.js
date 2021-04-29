import React, {useEffect} from 'react'
import './ReportesPromedio.css'

export const ReporteNumerodeEvaluadores = ( {numero} ) => {

    useEffect(() => {
        console.log(numero)
    }, [])

    return (
        <div>
            <div className="row ">
            

              <div className="col s5 container-evaluator">

                    <div>
                        <img className="emoticon" src="https://www.doctorempresa.com/evaluaciones/core/assets/img/evaluador.png" alt="evaluadores"/> 
                    </div>

                    <div className="promedio-total"> Numero de Evaluaciones </div>
                </div>

                <div className="col s5 container-evaluator">
                        <p className="numero-evalaciones"> {numero} </p>
                </div>

                
            </div>
        </div>
    )
}
