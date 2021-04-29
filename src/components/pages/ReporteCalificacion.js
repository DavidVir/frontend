import React, {useEffect} from 'react'
import './ReportesPromedio.css'

export const ReporteCalificacion = ( {numero} ) => {

    useEffect(() => {
        console.log(numero)
    }, [])

    return (
        <div>
            <div className="row ">
            

              <div className="col s5 container-emoticon">

                    <div>
                        <img className="emoticon" src="https://cdn.iconscout.com/icon/free/png-256/arrow-down-1793234-1521315.png" alt="evaluadores"/> 
                    </div>

                    <div className="promedio-total"> Evaluación mas baja </div>
                </div>

                <div className="col s5 container-emoticon">
                        <p className="promedio-acumulado"> {numero} </p>x
                </div>

                
            </div>
        </div>
    )
}
