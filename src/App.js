import React from 'react'
import { Sidebar } from './components/ui/Sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  import { Criterios } from "./components/pages/Criterios";
  import { Evaluador } from "./components/pages/Evaluador";
  import { Proveedor } from "./components/pages/Proveedor";
  import { Reportes } from  "./components/pages/Reportes";
  import { CrearProveedor } from './components/pages/CrearProveedor';
  import { Evaluar } from './components/pages/Evaluar';
  import { EvaluatorScreen } from './components/pages/EvaluatorScreen'
  import { EvaluationScreen } from './components/pages/EvaluationScreen';
  import { CriteriosScreen } from './components/pages/CriteriosScreen';
  import { ReportesPages } from './components/pages/ReportesPages';


function App() {
    return (
    
    <Router>
    <Sidebar/>
          <Switch>
            <Route exact path="/Proveedor" component={ Proveedor } />
            <Route exact path="/Proveedor/evaluador" component={ Evaluador } />
            <Route exact path="/Proveedor/reporte" component={ Reportes } />
            <Route exact path="/Proveedor/reportepromedio" component={ ReportesPages } />
            <Route exact path="/Proveedor/criterio" component={ Criterios  } />
            <Route exact path="/Proveedor/crear" component={ CrearProveedor }/>
            <Route exact path="/Evaluador/evaluar"  component={ Evaluar }/>
            <Route exact path="/Evaluador/consultar"  component={ EvaluatorScreen }/>
            <Route exact path="/Evaluador/evaluaciones"  component={ EvaluationScreen }/>
            <Route exact path="/criterios/consultar"  component={ CriteriosScreen }/>
            <Redirect to="/Proveedor"/>
          </Switch>
    </Router>
        
    )
}


export default App
