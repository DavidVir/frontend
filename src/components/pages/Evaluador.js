import React , {useEffect} from 'react'

import * as RiIcons from 'react-icons/ri';
import './Evaluador.css';

import M from "materialize-css";
import {Link} from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

import {conectividad} from './Conectividad';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";

 
export const Evaluador = () => {

    const location = useLocation();
    let name = "" , position = "" , phone = "" , correo = ""

    if(location.datos !== undefined){
        name = location.datos.name;
        position = location.datos.position;
        phone = location.datos.phone;
        correo =  location.datos.correo;
    }


    useEffect(() => {        
        let elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'left'
          });
    }, [])


    const [ formvalues , handleInputChange , reset ] = useForm(
        {
            nombre: name,
            cargo : position,
            telefono : phone,
            Email: correo
        }
    )

   
    const { nombre, cargo, telefono, Email } = formvalues;


    const save=()=> {
        

        axios({
            method: 'post',
            url: conectividad.endPointBack+'api/evaluador/crear',
            data: formvalues
          }).then(function (response) {
            console.log(response);
            if(response.data.resultado === "El evaluador a sido actualizado con exito"){
                Swal.fire(
                    'Criterio actualizado con exito',
                    '',
                    'success'
                  )
            }else{
                Swal.fire(
                    'Evaluador almacenado con exito',
                    '',
                    'success'
                  )
            }
            
          })
          .catch(function (error) {
            
            Swal.fire(
                'Algo anda mal, intente de nuevo más tarde',
                 error,
                'error'
              )

        });

        // disparar notificacion de datos almacenados


        // limpiar formulario

        reset()

    }



    return (
        <div>
            <div className="card back-div">
                <div className="row">
                    <div className="col s8"> 
                         <div className="icon-providers"> <RiIcons.RiTeamFill />  <span className="span-providers"> Evaluador </span> </div>
                    </div>
                    <div className="col s4">

                        <div className="btn-evaluation-create">

                                <div className="fixed-action-btn">
                                <a href={() => false} className="btn-floating btn-large green darken-2">
                                    <i className="large material-icons">dehaze</i>
                                </a>
                                <ul>
                                    <li> <Link to="/Evaluador/consultar"> <a href={() => false} className="btn-floating  light-blue darken-2"> <i className="material-icons">search</i> </a> </Link> </li>
                                    <li> <Link to="/Evaluador/evaluar"> <a href={() => false} className="btn-floating light-blue darken-3"> <i className="material-icons">assignment</i>  </a> </Link> </li>
                                </ul>
                                </div>

                        </div>


                    </div>
                </div>
            </div>

            <div className="card evaluador-form">
                <div className="container-evaluador">

                <div className="row">

                        <div className="col s7">
                            <input 
                            id="nombre"
                            name= "nombre" 
                            type="text" 
                            placeholder="ingrese el nombre"
                            className="validate"
                            value= {nombre} 
                            onChange = { handleInputChange}/>
                            <label> Nombre </label>
                        </div>
                        <div className="col s5">
                            <input
                            id="cargo"
                            name= "cargo" 
                            type="text" 
                            placeholder="ingrese el cargo"
                            className="validate"
                            value= {cargo} 
                            onChange = { handleInputChange}/>
                            <label > Cargo </label>
                        </div>
                </div>

                <div className="row">

                        <div className="col s5">
                            <input 
                            id="telefono"
                            name= "telefono" 
                            type="text" 
                            placeholder="ingrese el telefono"
                            className="validate"
                            value= {telefono} 
                            onChange = { handleInputChange}/>
                            <label> Telefono </label>
                        </div>
                        <div className="col s4">
                            <input 
                                id="Email"
                                name= "Email" 
                                type="text" 
                                placeholder="ingrese el Email"
                                className="validate"
                                value= {Email} 
                                onChange = { handleInputChange}/>
                            <label> Email </label>
                        </div>
                </div>

                <div className="row">

                    <div className="col s12">
                        <div className="btn-save">
                           <button onClick={save} className="btn waves-effect waves-light" type="submit" name="action"> Guardar
                               <i className="material-icons right">send</i>
                           </button>
                        </div>
                    </div>  


                </div>
                      
                </div>
            </div>
        </div>
    )
}
