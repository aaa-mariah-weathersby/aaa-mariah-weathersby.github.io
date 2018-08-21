import React from 'react';

import './coverageOption.css'

import CoverageOptionSwitch from './coverageOptionSwitch'
import Button from '../button/button.secondary'

import iconA from '../../../images/bodilyInj/BIC.png'
import iconB from '../../../images/propDam/prpDam.png'
import iconC from '../../../images/carCOv/carC.png'

// const CoverageOption = (props) => {

class CoverageOption extends React.Component {

  // state = {
  //   title: this.props.header,
  //   selectedOption: "",
  //   selectedOptionDetails: "",
  //   price: `${this.props.dollars}.${this.props.cents}`.replace('$','')
  // };

  render = () => {

    const props = this.props

    return (
      <div className={"coverage-option-container"}>


        <div className={"coverage-header-section"}>
            <h3>{props.header}</h3>
            <p className={"coverage-premium"}>12 month premium</p>

            <div className={"coverages"}>
              <h4>Coverages</h4>
              <ul>
                <li>
                  <img src={iconA}/> <p>Bodily Injury Liability</p>
                </li>
                <li>
                  <img src={iconB}/> <p>Property Damage Liability</p>
                </li>
                <li>
                  <img src={iconC}/> <p>Car Coverage</p>
                </li>
              </ul>
              
              <div 
                  className={"visible-toggle"}
                  onClick={props.toggleBehavior}
              >
                  <h5>View All Coverage Details</h5>
              </div>

            </div>

            <Button 
              text={props.buttonTitle}
              subText={props.subText}
              // isActive={props.isActive}
              action={() => props.action(this)}
              componentId={props.buttonID}
              classCSS={"button CTA-box secondary active"}
            />

            <Button 
              text={props.buttonTitle_beta}
              subText={props.subText_beta}
              // isActive={props.isActive}
              action={() => props.action_beta(this)}
              componentId={props.buttonID}
              classCSS={"button CTA-box secondary"}
            />

          </div>
                        
        </div>
    )
  }
};

export default CoverageOption;


