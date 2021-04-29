import React from 'react';

import * as RiIcons from 'react-icons/ri';
import {  BsBarChartFill, BsFillPersonCheckFill,  BsCardChecklist } from 'react-icons/bs';


export const sideData = [

{
     title: 'Proveedor' ,
     path:  '/Proveedor' ,
     icon:   <RiIcons.RiTeamFill/>,
     iconClosed: <RiIcons.RiArrowDownFill />,
     iconOpened: <RiIcons.RiArrowUpSFill />,
     subNav: [
    {
        title: 'Evaluador' ,
        path:  '/Proveedor/Evaluador' ,
        icon: <BsFillPersonCheckFill />
    },
    {
        title: 'Criterios' ,
        path:  '/Proveedor/criterio' ,
        icon: <BsCardChecklist />,
    },
    {
        title: 'Reportes' ,
        path:  '/Proveedor/reporte' ,
        icon: <BsBarChartFill />,
    }
    ]
},
{
    title: 'Facturación' ,
    path:  '/Facturación' ,
    icon:   <RiIcons.RiTeamFill/>,
    iconClosed: <RiIcons.RiArrowDownFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />, 
},
{
    title: 'Licitacion' ,
    path:  '/Licitacion' ,
    icon:   <RiIcons.RiTeamFill/>,
    iconClosed: <RiIcons.RiArrowDownFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />, 
},
{
    title: 'Nomina' ,
    path:  '/Nomina' ,
    icon:   <RiIcons.RiTeamFill/>,
    iconClosed: <RiIcons.RiArrowDownFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />, 
},
];
