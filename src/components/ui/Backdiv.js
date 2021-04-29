import React from 'react'
import * as RiIcons from 'react-icons/ri';
import PropTypes from 'prop-types';

import './Proveedor.css';

const Backdiv = ({name , icon}) => {

    return (
        <div>
            <div className="card back-div">
                <div className="icon-providers"> <RiIcons.RiTeamFill  /> <span className="span-providers"> {name} </span> </div>
            </div>
        </div>
    )
}

Backdiv.propTypes = {

name: PropTypes.string,
icon: PropTypes.string

}

export default Backdiv
