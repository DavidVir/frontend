import React, {useState, useEffect} from 'react';
import Backdiv from '../ui/Backdiv';
import {Proveedores} from './Proveedores';

import { useHistory } from "react-router-dom";
import axios from 'axios'
import {conectividad} from './Conectividad'
import M from 'materialize-css';

export const Reportes = () => {

    const history = useHistory();
    let data =0 , percentage =0 , calificationNumber= 0, totalPercent = 0 , percentageTotal=0;

    const handledChange =(e)=>{
        setproveedor(e.target.value);
     }
    
    
    const [proveedor, setproveedor] = useState("");
    let [providerlist , setproviderlist] = useState([]);


    useEffect(() => {

        let select = document.querySelectorAll('select');
        M.FormSelect.init(select);
        updateProviders()   
        

    },[]);


    const updateProviders = () => {
        cargarCombos().then((newProvider)=>{
            setproviderlist(newProvider);
        })
    }

    const cargarCombos = async () => {

        const data = await fetch(conectividad.endPointBack+'api/proveedores/');
        const pr = await data.json();

        return(pr.docs);
    }




    const generar = ()=> {


    axios({
        method: 'post',
        url: conectividad.endPointBack+'api/evaluaciones/acumuladototal',
        data: {"proveedor": proveedor}
      }).then(function (response) {
          data = parseInt(response.data.promedio);
          percentage = (data * 100 / 5)
      })
      .catch(function (error) {
        console.log(error)
      });


      axios({
        method: 'post',
        url: conectividad.endPointBack+'api/evaluaciones/acumulado',
        data: {"proveedor": proveedor}
      }).then(function (response) {
          totalPercent = parseInt(response.data.resultado[0].promedioGeneral);
          percentageTotal = (totalPercent * 100 / 5)
      })
      .catch(function (error) {
        console.log(error)
      });


      axios({
        method: 'post',
        url: conectividad.endPointBack+'api/evaluaciones/numeroevaluaciones',
        data: {"proveedor": proveedor}
      }).then(function (response) {
          calificationNumber = parseInt(response.data.resultado);
          history.push({
            pathname: '/Proveedor/reportepromedio',
            datos: { 
               promedio : data ,
               porcentaje : percentage,
               acumulado : percentageTotal,
               porcentajeTotal: totalPercent,
               numeroEvaluadores: calificationNumber,
               proveedor : proveedor
             } 
            })
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
                            <div className="col s6">
                                <div className="padding-select">
                                    <select defaultValue={'DEFAULT'} value={proveedor} onChange={handledChange}>
                                        <option value="DEFAULT" disabled> Escoga un proveedor  </option>
                                        {
                                            Proveedores.map((item )=> {
                                            return ( 
                                                <option key={item._id} value={item.nombre}>  {item.nombre} </option> 
                                                );
                                        })
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="col s6 ">
                                <div className="btn-generar" >
                                    <button onClick={generar} className="btn waves-effect waves-light" type="submit" name="action"> Generar
                                    <i className="material-icons right">send</i>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
        </div>
    )
}

