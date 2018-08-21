import React from 'react';

import './coverageOption.css'

import CoverageOptionSwitch from './coverageOptionSwitch'
import Button from '../button/button.secondary'

// const CoverageOption = (props) => {

class CoverageOption extends React.Component {

  state = {
    title: this.props.header,
    selectedOption: "",
    selectedOptionDetails: "",
    price: `${this.props.dollars}.${this.props.cents}`.replace('$','')
  };

  componentDidMount = () => {
    console.log("options: ", this)
  }

  captureOptions = (optionComponent) => {

    for (var opts in optionComponent.state){
      var currOpt = optionComponent.state[opts]

      if (currOpt === true){
        var selectedDetName = opts.toString() + "Details"
        var selectedOptionDetails_string = optionComponent.state[selectedDetName]

        this.setState(
          { 
            selectedOption: opts,
            selectedOptionDetails: selectedOptionDetails_string
          },
          () => console.log("currOpt: ", this.state)
        )

      }

    }

  }

  render = () => {

    const props = this.props

    return (
      <div className={"coverage-option-container"}>

          <div className={"coverage-header-section"}>
              <h3>{props.header}</h3>

              <CoverageOptionSwitch 
                  action={this.captureOptions}
                  checked_alphaDetails={props.optionDetailsAlpha}
                  checked_betaDetails={props.optionDetailsBeta}
              />

              <div className={"CTA-container"}>
                  <div className={"price CTA-box"}>
                      <h5>Start today for</h5>
                      <h4>{props.dollars}.<sup>{props.cents}</sup></h4>
                  </div>
                  <Button
                      text={props.buttonTitle}
                      // isActive={props.isActive}
                      action={() => props.action(this)}
                      componentId={props.buttonID}
                      classCSS={"button CTA-box secondary"}
                  />
              </div>


              <div 
                  className={"visible-toggle"}
                  onClick={props.toggleBehavior}
              >
                  <h5>View Coverage Details</h5>
              </div>

              
          </div>
          
        </div>
    )
  }
};

export default CoverageOption;

// function CoverageOption(props) {
//     const { classes } = props;
  
//     return (
//       <div className={"classes.container"}>
  
//        </div>
//     );
//   }
  
//   export default CoverageOption;


