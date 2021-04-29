import React , {useState} from 'react';
import {Link} from 'react-router-dom';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import {sideData} from './SidebarData';

import './Sidebar.css';
import { Submenu } from './Submenu';
import { IconContext } from 'react-icons/lib';

export const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = ()=> setSidebar(!sidebar);


    return (
    <IconContext.Provider value={{ color: '#fff' }}>
        <div className="Nav">
           <Link className="ln-menu">
             <img src={"https://www.techedgegroup.com/hubfs/2018_website/assets/img/logotipo-notag.svg"} className="logo-img" alt="logo de la empresa techedge"/>
             <FaIcons.FaBars className="principal-icon" onClick={showSidebar}/>
           </Link>
           <nav  className={(sidebar)? 'SidebarVisible': 'SidebarHidden'} sidebar={sidebar}>
                <div className="sidebarWrap">
                 {
                     sideData.map(( item, index )=> {
                         return <Submenu item={item} key={index} />
                     })
                 }
                 <br />
                 <Link className="ln-menu" to="#">
                    <AiIcons.AiOutlineArrowLeft className="img-closed" onClick={showSidebar} />
                 </Link>
                </div>    
           </nav>
        </div>
    </IconContext.Provider>
    )
}
