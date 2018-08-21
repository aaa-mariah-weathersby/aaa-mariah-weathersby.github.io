import React from 'react';
import PropTypes from 'prop-types';

import styles from './helper.css';
import helperImg from '../../../images/helper-AI/fill-1@2x.png'

const Helper = ( props ) => {

  return (
    (props.active) 
    ?
    <div className={"helper-container " + props.helperContainerClasses}>
        {/* <div id={"helper-id"} className={"helper-child"}>
        </div> */}

        <img id={"helper-id"} src={helperImg} className={"helper-child"} />
        <p className={"helper-content helper-child " + props.helperClasses}>
            {props.content}
        </p>
    </div>
    : null

  )

};

Helper.propTypes = {
};

export default Helper;

