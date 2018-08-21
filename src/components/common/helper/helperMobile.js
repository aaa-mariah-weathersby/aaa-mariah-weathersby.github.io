import React from 'react';
import PropTypes from 'prop-types';

import styles from './helper.css';
import Helper from './helper'


const HelperMobile = ( props ) => {

  return (
    (props.active) 
    ?
    <div className={"full-helper"}>
        <Helper
            active={props.active}
            helperClasses={props.helper}
            content={props.content}
        />
    </div>
    : null

  )

};

HelperMobile.propTypes = {
};

export default HelperMobile;


    // (props.helperActive) 
    // ? 
    // <div className={"helper-container"}>
    //     {props.content}
    // </div>
    // : null