import React, {useState, useEffect} from 'react'
import Backdiv from '../ui/Backdiv'
import axios from 'axios';

import './Evaluador.css';
import  TableEvaluators  from './TableEvaluators'

import {conectividad} from './Conectividad'

export const EvaluatorScreen = () => {

    const [evaluadores, setEvaluadores] = useState([]);

    useEffect(() => {
        obtenerdatos();
    }, [])
  
   const obtenerdatos = async()=>{
  

   axios.get(conectividad.endPointBack+'api/evaluador/')
  .then((response) => {
    const {docs} = response.data
    setEvaluadores(docs);
  })
  .catch((error) => {
    console.log(error)
  });

    }
    return (
         <div>
            <Backdiv name={'Evaluadores'} icon={'RiTeamFill'} />
    

            <div className="evaluador-form">
                
                    <TableEvaluators evaluadores={evaluadores} />

            </div>


         </div>
    )
}
