import React from 'react'

import * as RiIcons from 'react-icons/ri';
import './Proveedor.css';

import { useForm } from '../../hooks/useForm';
import {conectividad} from './Conectividad';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from "react-router-dom";



export const CrearProveedor = () => {


    const location = useLocation();
    let name = "" , identificationNumber = "" , reason = "", street = "" ,postalcode = "" ,city = "", departament = "",country="",phone="",correo="",description=""

    if(location.datos !== undefined){
        name = location.datos.name;
        identificationNumber = location.datos.identificationNumber;
        reason = location.datos.reason;
        street = location.datos.street;
        postalcode= location.datos.postalcode;
        city= location.datos.city;
        departament = location.datos.departament;
        country = location.datos.country;
        phone = location.datos.phone;
        correo = location.datos.correo;
        description = location.datos.description
    }


    const [ formvalues , handleInputChange , reset ] = useForm(
        {
            nombre: name,
            DNI : identificationNumber ,
            razon : reason,
            direccion : street,
            codigopostal : postalcode,
            ciudad : city,
            departamento: departament,
            pais : country,
            telefono : phone,
            Email : correo,
            Descripcion : description
        }
    )

   
    const { nombre, DNI , razon, direccion, codigopostal, ciudad, departamento , pais, telefono, Email, Descripcion} = formvalues;

    const save=()=> {
        

        axios({
            method: 'post',
            url: conectividad.endPointBack+'api/proveedores/crear',
            data: formvalues
          }).then(function (response) {
            console.log(response);
            if(response.data.resultado === "El proveedor a sido actualizado con exito"){
                Swal.fire(
                    'Proveedor actualizado con exito',
                    '',
                    'success'
                  )
            }else{
                Swal.fire(
                    'Proveedor almacenado con exito',
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
                <div className="icon-providers"> <RiIcons.RiTeamFill />  <span className="span-providers"> Crear Proveedor </span> </div>
            </div>

            <div className="card providers-form">
                <div className="form-providers">
                    <div className="row">
                        <div className="col s7">
                            <input 
                            id="nombre"
                            name="nombre" 
                            type="text" 
                            className="validate"
                            value= {nombre} 
                            onChange = {handleInputChange}/>
                            <label> Nombre </label>
                        </div>
                        <div className="col s5">
                            <input 
                            id="DNI"
                            name="DNI" 
                            type="text" 
                            className="validate"
                            value= {DNI} 
                            onChange = {handleInputChange}/>
                            <label> DNI/RUT </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s5">
                            <input 
                            id="razon"
                            name="razon" 
                            type="text" 
                            className="validate"
                            value={razon}
                            onChange = {handleInputChange}
                            />
                            <label> Razon Social </label>
                        </div>
                        <div className="col s4">
                            <input 
                            id="direccion"
                            name="direccion" 
                            type="text" 
                            className="validate"
                            value={direccion}
                            onChange = {handleInputChange}/>
                            <label> Dirección </label>
                        </div>
                        <div className="col s3">
                            <input 
                            id="codigopostal"
                            name="codigopostal" 
                            type="text" 
                            className="validate"
                            value={codigopostal}
                            onChange = {handleInputChange}/>
                            <label> Codigo Postal </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s4">
                            <input 
                            id="ciudad"
                            name="ciudad" 
                            type="text" 
                            className="validate"
                            value = {ciudad}
                            onChange = {handleInputChange}/>
                            <label> Ciudad </label>
                        </div>
                        <div className="col s4">
                            <input 
                            id="departamento" 
                            name="departamento"
                            type="text" 
                            className="validate"
                            value = {departamento}
                            onChange = {handleInputChange}/>
                            <label> Departamento </label>
                        </div>
                        <div className="col s4">
                            <input 
                            id="pais"
                            name="pais" 
                            type="text"
                            className="validate"
                            value= {pais}
                            onChange = {handleInputChange}/>
                            <label> País </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <input 
                            id="telefono"
                            name="telefono" 
                            type="text"
                            className="validate"
                            value= {telefono}
                            onChange = {handleInputChange}/>
                            <label> Telefono </label>
                        </div>
                        <div className="col s6">
                            <input 
                            id="Email" 
                            name="Email"
                            type="Email" 
                            className="validate"
                            value={Email}
                            onChange = {handleInputChange}/>
                            <label> Email </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <textarea 
                            id="Descripcion" 
                            name="Descripcion"
                            type="text"
                            value={Descripcion}
                            onChange={handleInputChange}
                            className="materialize-textarea"></textarea>
                            <label> Descripción </label>
                        </div>
                    </div>
                    <div className="row">

                    <div className="col s12 ">
                        <div className="btn-save" >
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
