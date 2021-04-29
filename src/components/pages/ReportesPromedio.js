import React from 'react'
import './ReportesPromedio.css'

import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import VisibilitySensor from "react-visibility-sensor";


export const ReportesPromedio = ({ promedio , porcentaje, promedioGeneral , numero, porcentajetotal}) => {

  const numeroEvaluadores = 5;


  return (
    <div>

      <div className="row">

        <div className="container-percentage col s4">
          <div className="porcentaje">
            <VisibilitySensor className="percentage">
              {({ isVisible }) => {
                const percentage = isVisible ? {porcentaje} : 0;
                return (
                  <CircularProgressbar className="circularbar"
                    value={porcentaje}
                    text={`${porcentaje}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'round',                   
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,                   
                      // Colors
                      pathColor: '#04635b',
                      textColor: '#04635b',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#0e8b40',
                    })}
                  />
                );
              }}
            </VisibilitySensor>
            <div className="text-circle-bar"> Promedio acumulado: <strong>{ promedio } </strong> </div>
          </div>
        </div>

        <div className="container-percentage col s4">
          <div className="porcentaje">
            <VisibilitySensor className="percentage">
              {({ isVisible }) => {
                const percentage = isVisible ? 100 : 0;
                return (
                  <CircularProgressbar className="circularbar"
                    value={numero}
                    text={`${numero} N°`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'round',                   
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,                   
                      // Colors
                      pathColor: '#0e8b40',
                      textColor: '#0e8b40',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#0e8b40',
                    })}
                  />
                );
              }}
            </VisibilitySensor>
            <div className="text-circle-bar"> Numero de Evaluadores : <strong> {numero} </strong> </div>
          </div>
        </div>

        <div className="container-percentage col s4">
          <div className="porcentaje">
            <VisibilitySensor className="percentage">
              {({ isVisible }) => {
                const percentage = isVisible ? {porcentajetotal} : 0;
                return (
                  <CircularProgressbar className="circularbar"
                    value={porcentajetotal}
                    text={`${porcentajetotal}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,
                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: 'round',                   
                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,                   
                      // Colors
                      pathColor: '#04635b',
                      textColor: '#04635b',
                      trailColor: '#d6d6d6',
                      backgroundColor: '#0e8b40',
                    })}
                  />
                );
              }}
            </VisibilitySensor>
            <div className="text-circle-bar"> Promedio General todos los proveedores: <strong>  {promedioGeneral} </strong> </div>
          </div>
        </div>          
      
      </div>
    </div>
  )
}
