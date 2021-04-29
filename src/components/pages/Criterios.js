import React, {useEffect} from 'react';
import Backdiv from '../ui/Backdiv';
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import {conectividad} from './Conectividad';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";

import M from "materialize-css";


export const Criterios = () => {

    const location = useLocation();
    let name = "" ;
    let description = ""

    if(location.datos !== undefined){
        name = location.datos.name;
        description = location.datos.description;
    }
    
    //console.log('este es el nombre para actualizar' + nombre  + " " +  descripcion );


    useEffect(() => {   
        
        let elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'left'
        });

    }, [])

    


    const [ formvalues , handleInputChange , reset ] = useForm(
        {
            nombre: name,
            descripcion : description
        }
    )

   
    const { nombre, descripcion } = formvalues;


    const save=()=> {
        

        axios({
            method: 'post',
            url: conectividad.endPointBack+'api/criterios/crear',
            data: formvalues
          }).then(function (response) {
            console.log(response);
            if(response.data.resultado === "El criterio a sido actualizado con exito"){
                Swal.fire(
                    'Criterio actualizado con exito',
                    '',
                    'success'
                  )
            }else{
                Swal.fire(
                    'Criterio almacenado con exito',
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

        <Backdiv name={'Criterios'} icon={'RiTeamFill'} />

        <div className="card providers-form">
            <div className="form-providers">

                    <div className="row">
                            <div className="col s7">
                                <input 
                                       id="nombre"
                                       name= "nombre" 
                                       type="text" 
                                       placeholder="ingrese el nombre"
                                       className="validate"
                                       value= {nombre} 
                                       onChange = { handleInputChange} />
                                <label> Nombre criterio </label>
                            </div>
                    </div>

                    <div className="row">
                            <div className="col s12">
                                <textarea id="descripcion" 
                                name="descripcion"
                                className="materialize-textarea"
                                placeholder="ingrese la descripcion"
                                value= {descripcion} 
                                onChange = { handleInputChange}
                                >
                                </textarea>
                                <label > Descripción </label>
                            </div>
                    </div>

                    <div className="row">
                        <div className="col s12 ">
                             <div className="btn-save" >
                                    <button  onClick={save} className="btn waves-effect waves-light" type="submit" name="action"> Guardar
                                    <i className="material-icons right">send</i>
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
                                    <li> <Link to="/criterios/consultar"> <a href={() => false} className="btn-floating  light-blue darken-2"> <i className="material-icons">search</i> </a> </Link> </li>
                                </ul>
                                </div>

                    </div>  

             </div>
        </div>

        </div>
    )
}
