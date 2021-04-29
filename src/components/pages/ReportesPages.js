import React,{useEffect, useState} from 'react'
import Backdiv from '../ui/Backdiv';

import M from 'materialize-css';
import { ReporteUltimosEvaluadores } from './ReporteUltimosEvaluadores';
import { ReportesPromedio } from './ReportesPromedio';
import { useLocation } from "react-router-dom";

import axios from 'axios'
import {conectividad} from './Conectividad'

export const ReportesPages = () => {

    const location = useLocation();
    let [average, setAverage] = useState(0);
    let [percentaje, setpercentaje] = useState(0)
    let [numeroCalificadores, setnumeroCalificadores] = useState(0)
    let [promedioGeneral, setpromedioGeneral] = useState(0)
    let [percentageTotal, setpercentageTotal] = useState(0)
    let [evaluadores , setevaluadores] = useState([])  
    let proveedor = ""
  
    useEffect(() => {

        

        if(location.datos !== undefined){
            setAverage(location.datos.promedio);
            setpercentaje(location.datos.porcentaje);
            setnumeroCalificadores(location.datos.numeroEvaluadores);
            setpromedioGeneral(location.datos.porcentajeTotal);
            setpercentageTotal(location.datos.acumulado);
            proveedor = location.datos.proveedor
        }


        obtenerdatos();


        let tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);



    }, [])

    const obtenerdatos = async()=>{
  
        axios({
            method: 'post',
            url: conectividad.endPointBack+'api/evaluaciones/reporte',
            data: {"proveedor": proveedor}
          }).then(function (response) {
                 setevaluadores(response.data.ultimosevaluadores);
          })
          .catch(function (error) {
            console.log(error)
          });
    }

    return (

        <div>
            <Backdiv name={'Reporte'} icon={'RiTeamFill'} />
            <div className="card evaluador-form">

                <div className="row">
                    <div className="col s12">
                        <ul className="tabs ">
                            <li className="tab col s6"><a href="#Reporte-calificacion"> Promedio </a></li>
                            <li className="tab col s6"><a href="#Reporte-ultimos-evaluadores"> Últimos evaluadores </a></li>
                        </ul>

                        <div id="Reporte-calificacion" className="col s12">
                            <ReportesPromedio promedio={average} porcentajetotal={percentageTotal} porcentaje={percentaje} numero={numeroCalificadores} promedioGeneral={promedioGeneral}  />
                        </div>
                        <div id="Reporte-ultimos-evaluadores" className="col s12">
                            <ReporteUltimosEvaluadores  evaluadores = {evaluadores} />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
