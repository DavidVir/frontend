import React from 'react';
import Backdiv from '../ui/Backdiv';
import { ReporteNumerodeEvaluadores } from './ReporteNumeroEvaluadores';
import { ReportesPromedio } from './ReportesPromedio';
import { ReporteCalificacion } from './ReporteCalificacion';
import Graph from './graph';

export const GenerarReporte = () => {
    return (
        <div>
            <Backdiv name={'Reporte'} icon={'RiTeamFill'} />
            <div className="card evaluador-form">
                <div className="row">
                    <div className=" col s4">
                        <ReportesPromedio promedio={4} />
                    </div>
                    <div className="col s4">
                        <ReporteNumerodeEvaluadores numero={10} />
                    </div>
                    <div className="col s4">
                        <ReporteCalificacion numero={3} />
                    </div>

                </div>

                <div className="row">
                    <div className="col s8">
                        <Graph />
                    </div>
                    <div className="col s4">
                        <br />
                                ultimos evaluadores
                            </div>

                </div>


            </div>
        </div>
    )
}
