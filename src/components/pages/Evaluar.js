import React , {useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Backdiv from '../ui/Backdiv';
import M from "materialize-css";
import './Evaluador.css';
import ReactStars from "react-rating-stars-component";


import {conectividad} from './Conectividad';
import axios from 'axios';
import {Proveedores} from './Proveedores';
import {evaluadores} from './Evaluadores';
import Swal from 'sweetalert2';


let criteriosData = [];
let notas = []; 


export const Evaluar = () => {



    const [Evaluadores, setEvaluadores] = useState([]);
    const [providers, setProviders] = useState([]);
    const [Criterios, setCriterios] = useState([]);
    const [proveedor, setproveedor] = useState("");
    const [evaluador, setevaluador] = useState("");

    const handledChange =(e)=>{
       setproveedor(e.target.value);
    }

    const handledChange2 =(e)=>{
        setevaluador(e.target.value);
     }

   
    useEffect(() => { 

        obtenerdatosEvaluador();
        obtenerdatosProveedores();
        obtenerdatosCriterio();
        
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);

        let elems2 = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems2, {
            direction: 'left'
          });
        
    }, []);


    const obtenerdatosEvaluador = () =>{
        axios.get(conectividad.endPointBack+'api/evaluador/')
       .then((response) => {
         const {docs} = response.data
         setEvaluadores(docs);
       })
       .catch((error) => {
         console.log(error)
       });

       console.log(Evaluadores);
    }


    const obtenerdatosProveedores = () =>{
        axios.get(conectividad.endPointBack+'api/proveedores/')
       .then((response) => {
         const {docs} = response.data
         setProviders(docs);
       })
       .catch((error) => {
         console.log(error)
       });
    }

    const obtenerdatosCriterio = () =>{
        axios.get(conectividad.endPointBack+'api/criterios/')
       .then((response) => {
         const {docs} = response.data
         setCriterios(docs);
       })
       .catch((error) => {
         console.log(error)
       });
    }


    const CapturarEvaluaciones =(calificacion, posicion)=> {
        notas[posicion] = calificacion
    }


    const capturarDataCriterios =()=>{

        let ObjetoCriterio = {};

        console.log(Criterios.length);

        Criterios.map((items,index)=>{
        if((Criterios.length - 1) <= index ){
            ObjetoCriterio = { "descripcion": items.nombre,
            "calificacion": notas[index] };

                criteriosData.push(ObjetoCriterio);
        }else{
            ObjetoCriterio =  { "descripcion": items.nombre,
            "calificacion": notas[index] } ;

               criteriosData.push(ObjetoCriterio);
        }
        })

        console.log(criteriosData);

    };

    const generarFecha =()=>{
        
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        return hoy.toISOString();
    }


    const save = ()=>{

        capturarDataCriterios();

        const data = {
            "fecha" : generarFecha(),
            "evaluador" : evaluador,
            "proveedor":  proveedor,
            "criterios": criteriosData
        }

        axios({
            method: 'post',
            url: conectividad.endPointBack+'api/evaluaciones/crear',
            data: data
          }).then(function (response) {
            console.log(response);
                Swal.fire(
                    'Evaluación almacenada con exito',
                    '',
                    'success'
                  )
          }).catch(function (error) {
            
            Swal.fire(
                'Algo anda mal, intente de nuevo más tarde',
                 error,
                'error'
              )

        });
    }
    


    return (
        <div>
            <Backdiv name={'Evaluar'} icon={'RiTeamFill'} />

            <div className="card evaluador-form">
                <div className="container-evaluador">


                    <div className="row">
                        <div id="comboEvaluadores" className="col s6">
                            
                            <select defaultValue={'DEFAULT'} value={evaluador} onChange={handledChange2} >
                                <option value="DEFAULT" disabled> Escoga un evaluador </option>
                                {
                                        evaluadores.map((item , index) => {
                                            return ( 
                                                <option  key={index} value={item.nombre}> {item.nombre} </option> 
                                                );
                                        })    
                                };
                            </select>
                        </div>

                        <div id="comboProveedores" className="col s6">
                            <select defaultValue={'DEFAULT'} value={proveedor} onChange={handledChange} >
                                <option value="DEFAULT" disabled> Escoga un proveedor </option>
                                {
                                        Proveedores.map((item , index) => {
                                            return ( 
                                                <option  key={index} value={item.nombre}> {item.nombre} </option> 
                                                );
                                        })    
                                };
                            </select>
                        </div>
                    </div>


                    <div className="row">

                        <div className="card col s12">
                        <label className="title"> lista criterios </label>
                            <table>
                                <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="title-calification">Calificación</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Criterios.map((item, index)=>{
                                    return( 
                                        <tr key={index}> 
                                            <td> {item.nombre}   
                                            </td>
                                            <td> 
                                            <div>
                                            <ReactStars
                                                    count={5}
                                                    name={index}
                                                    onChange={(e)=> {CapturarEvaluaciones(e , index)}}
                                                    size={24}
                                                    activeColor="rgba(22,157,54,1)"
                                                />
                                            </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }            
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="btn-action-evaluation">
                                <button  onClick={save} className="btn waves-effect waves-light" type="submit" name="action">
                                    <i className="material-icons right">save</i>
                                </button>
                    </div>

                </div>
            </div>

            <div className="btn-evaluation-create">

                <div className="fixed-action-btn">
                <a href={() => false} className="btn-floating btn-large green darken-2">
                    <i className="large material-icons">dehaze</i>
                </a>
                <ul>
                    <li> <Link to="/Evaluador/evaluaciones"> <a href={() => false} className="btn-floating  light-blue darken-2"> <i className="material-icons">search</i> </a> </Link> </li> 
                </ul>
                </div>

            </div>


        </div>
    )
}
