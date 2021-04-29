import React,{useState, useEffect} from 'react'
import EvaluationTable from './EvaluationTable'
import './Evaluador.css';
import Backdiv from '../ui/Backdiv';

import axios from 'axios';
import {conectividad} from './Conectividad'

export const EvaluationScreen = () => {

   const [evaluaciones, setEvaluaciones] = useState([]);

    useEffect(() => {
        obtenerdatos();
    }, [])
  
   const obtenerdatos = async()=>{
  

   axios.get(conectividad.endPointBack+'api/evaluaciones/')
  .then((response) => {
    const {docs} = response.data
    setEvaluaciones(docs);
  })
  .catch((error) => {
    console.log(error)
  });

    }

    return (
        <div>
            
            <Backdiv name={'Evaluaciones'} icon={'RiTeamFill'} />
                    <div className="evaluador-form">
                            <EvaluationTable evaluaciones={evaluaciones}/>
                    </div>
        </div>
    )
}
