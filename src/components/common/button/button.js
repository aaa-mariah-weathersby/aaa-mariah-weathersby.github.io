import React from 'react';
import PropTypes from 'prop-types';

import Helper from '../helper/helper'
import Pic from '../../../images/memberIcon/membership.png'
import PicB from '../../../images/loaderIMG/spinnerB.gif'

import styles from './button.css'



const Button = ({ 
  action, text, classCSS, componentId, isActive, secondary="false", helper=false, helperCopy="", helperAction="", helperActive=false,
  helperContClasses="", loader=false, sublinkCopy="", subLinkClasses="", ghost=false
}) => {

  var activeClass = isActive ? " active" : "" 
  var loaderClass = loader ? " loader" : ""
  var subLinkClass = sublinkCopy ? " sublink" : ""


  var helperEl = 
      <Helper
        content={helperCopy}
        onClick={helperAction}
        active={helperActive}
        helperContainerClasses={helperContClasses}
      />

  var loaderImg = {
    backgroundImage: 'url(' + PicB + ')',
  };


  return (

      <div className={
        ghost ? "flex-break ghost" : "flex-break"
      }> 

        {
          (helper == 'false')
          ? null
          : helperEl
        }

        <div 
          id={componentId}
          onClick={isActive ? action : null}
          className={classCSS + activeClass + loaderClass + subLinkClass}          
          style={loader ? loaderImg : null }
        >  
          <p>{text}</p>
        </div>

        { 
          sublinkCopy 
          ? <p className={"button-sub-link" + subLinkClasses}>{sublinkCopy}</p> 
          : null 
        }

      </div>
         
  )

};

// Button.propTypes = {
//   action: PropTypes.func.isRequired,
//   text: PropTypes.string.isRequired,
//   classCSS: PropTypes.string,
//   componentId: PropTypes.string.isRequired,
// };

export default Button;
