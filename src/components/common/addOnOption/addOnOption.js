import React from 'react';
import PropTypes from 'prop-types';

import styles from './addOn.css';
import icon from '../../../images/price-tag/discount.png'
import Switch from '../switch/switch'

import Helper from '../helper/helper'


const CoverageOption = ( props ) => {

  return (

    <div className={"coverage-option-container"}>

          <div className={"add-on"}>
            <div className={"add-on-wrapper"}>
              <div className={"CTA-section"}>
                <div className={"add-on-labels"}>
                    <h4>{props.title}</h4>
                    <h4 className={"monthly-price"}>{props.monthlyPrice}/mo</h4>
                    <p className={"dead-link"}>See options</p>
                    { props.subCopy 
                      ? <p className={"add-on-subcopy"}>{props.subCopy}</p>
                      : null
                    }

                </div>
                <div className={"check"}>
                  <Switch 
                    value={props.switchVal}
                    onClick={props.clickBehavior}
                    defaultcheck={props.isActiveSwitch}
                  />
                </div>
              </div>

              <div className={"savings"}>
                <img src={icon}/>
                <p className={"dead-link"}>Save an additional ${props.additionalSavings}</p>
              </div>
            </div>
          </div>

          {
            props.helper
            ? <Helper
              content={props.helperContent}
              active={props.helperActive}
            />
            : null
          }

    </div>

  )

};

CoverageOption.propTypes = {
};

export default CoverageOption;

