import React, { useState } from 'react'
import {Link} from 'react-router-dom'

import './Sidebar.css'

export const Submenu = ({ item }) => {

    const [subNav, setsubNav] = useState(false);

    const showSubnav = ()=>   setsubNav(!subNav);

    return (
         <div className="container-menu">
            <Link className="SidebarLink" to={item.path} onClick={item.subNav && showSubnav}>
                <div> 
                        {item.icon} 
                        <span className="SidebarLabel"> {item.title} </span>
                </div>
                <div>
                    {item.subNav && subNav 
                    ? item.iconOpened 
                    : item.subNav 
                    ? item.iconClosed 
                    : null}
                </div>
            </Link>
                {subNav && item.subNav.map((item , index) => {
                    return (
                        <Link className="DropdownLink" to={item.path} key={index}>
                            {item.icon}
                            <span className="SidebarLabel"> {item.title} </span>
                        </Link>
                    )
                })}
            
         </div>
    )
}
