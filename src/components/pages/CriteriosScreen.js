import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './Evaluador.css';
import Backdiv from '../ui/Backdiv';
import CriteriosTable  from './CriteriosTable';

import {conectividad} from './Conectividad'



export const CriteriosScreen = () => {

    const [criterios, setcriterios] = useState([]);

    useEffect(() => {
        obtenerdatos();
    }, [])
  
   const obtenerdatos = async()=>{
  

   axios.get(conectividad.endPointBack+'api/criterios/')
  .then((response) => {
    const {docs} = response.data
    setcriterios(docs);
  })
  .catch((error) => {
    console.log(error)
  });

    }

    return (
        <div>
              <Backdiv name={'Criterios de evaluacion'} icon={'RiTeamFill'} />
                    <div className="evaluador-form">
                            <CriteriosTable criterios={criterios} />
                    </div>
        </div>
    )
}
