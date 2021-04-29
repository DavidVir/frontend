import React, {useState, useEffect} from 'react'
import * as RiIcons from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CustomPaginationActionsTable from './CustomPaginationActionsTable';
import axios from 'axios';

import {conectividad} from './Conectividad'

import './Proveedor.css';

export const Proveedor = () => {

    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        obtenerdatos();
    }, [])
  
   const obtenerdatos = async()=>{
  

   axios.get(conectividad.endPointBack+'api/proveedores/')
  .then((response) => {
    const {docs} = response.data
    setProveedores(docs);
  })
  .catch((error) => {
    console.log(error)
  });

    }

   
    return (
        <div>
            <div className="card back-div">
                <div className="icon-providers"> <RiIcons.RiTeamFill />  <span className="span-providers"> Proveedores </span> </div>
            </div>

            <div className="providers-table">
                    <CustomPaginationActionsTable proveedores={proveedores}/>
            </div>

            <div className="btn-add">
            <a href={() => false} className="btn-floating btn-large waves-effect green darken-3">
             <Link to="/Proveedor/crear"> 
             <i className="material-icons">add</i>
             </Link>
            </a>
            </div> 

        </div>
    )
}
