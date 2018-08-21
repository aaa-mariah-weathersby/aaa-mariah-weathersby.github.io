import React from 'react';
import PropTypes from 'prop-types';

import Helper from '../helper/helper'
// import loaderImg from '../../../images/loader/spinnerB.gif'

import './button.css';
import './button.secondary.css';


const Button = ({ 
  action, text, classCSS, componentId, isActive, name="", value="", secondary="false", helper=false, helperCopy="", helperAction="", helperActive=false,
  helperContClasses="", loader=false, sublinkCopy="", subLinkClasses="", subText="", ghost=false
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
          onClick={action}
          className={classCSS + activeClass + loaderClass + subLinkClass}    
          name={name}      
          value={value}
        >  
          <p>{text}</p>    
          {
            subText
            ? <p className={"subText"}>{subText}</p>
            : null
          }      
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
