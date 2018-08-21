import React from 'react';
import PropTypes from 'prop-types';

import '../addOnOption/addOn.css';

// import Switch from '../switch/switch'
import Switch from '@material-ui/core/Switch';

// const CoverageOptionSwitch = ( props ) => {

class CoverageOptionSwitch extends React.Component {
  
  state = {
    checked_alpha: false,
    checked_beta: false,
  };

  componentDidMount = () => {

    if (this.props.checked_alphaDetails)
      this.setState({checked_alphaDetails: this.props.checked_alphaDetails})

    if (this.props.checked_betaDetails)
    this.setState({checked_betaDetails: this.props.checked_betaDetails})

    
  }

  flipDisable = (el) => {

    var name = el.target.name;

    if (name == "checked_alpha")
      this.setState({
        checked_alpha: true,
        checked_beta: false,        
      },
      () => { this.parentCB() }
    )

    if (name == "checked_beta")
      this.setState({
        checked_alpha: false,
        checked_beta: true,        
      },
      () => { this.parentCB() }
    )

  }

  parentCB = () => {
    if (this.props.action)
      this.props.action(this)
  }

 render = () => {
   return (
     <div>

      <div className={"add-on-B"}>
        <div className={"add-on-wrapper"}>
          <div className={"CTA-section"}>

            <div className={"add-on-labels"}>
              <h4 className={"monthly-price"}>{this.props.checked_alphaDetails}</h4>
            </div>

            <div className={"check"}>
              <Switch 
                checked={this.state.checked_alpha}
                onChange={ (el) => this.flipDisable(el) }
                // onChange={this.flipDisable}
                // value={this.props.value}
                name={"checked_alpha"}
                // color={"primary"}
              />
            </div>

          </div>
        </div>
      </div>

      <div className={"add-on-B"}>
        <div className={"add-on-wrapper"}>
          <div className={"CTA-section"}>

            <div className={"add-on-labels"}>
              <h4 className={"monthly-price"}>{this.props.checked_betaDetails}</h4>
            </div>

            <div className={"check"}>
              <Switch 
                checked={this.state.checked_beta}
                onChange={ (el) => this.flipDisable(el) }
                // value={this.props.value}
                name={"checked_beta"}
                // color={"primary"}
              />
            </div>

          </div>
        </div>
      </div>      

    </div>
   )
 }
   
  /*
  render = () => { 
    return (
      <div className={"coverage-option-container"}>

            <div className={"add-on-B"}>
              <div className={"add-on-wrapper"}>
                <div className={"CTA-section"}>

                  <div className={"add-on-labels"}>
                      <h4 className={"monthly-price"}>
                      </h4>
                  </div>

                  <div className={"check"}>
                    <Switch 
                      // value={switchA}
                      onClick={this.flipDisableA}
                      defaultcheck={this.state.switchA}
                      checkOverride={this.state.switchA}
                    />
                  </div>

                </div>

              </div>
            </div>

            
            <div className={"add-on-B"}>
              <div className={"add-on-wrapper"}>
                <div className={"CTA-section"}>

                  <div className={"add-on-labels"}>
                      <h4 className={"monthly-price"}>
                      </h4>
                  </div>

                  <div className={"check"}>
                    <Switch 
                      // value={this.state.switchB}
                      onClick={this.flipDisableB}
                      defaultcheck={this.state.switchB}
                      checkOverride={this.state.switchB}
                    />
                  </div>

                </div>

              </div>
            </div>


      </div>

    )

  }
  */

};

CoverageOptionSwitch.propTypes = {
};

export default CoverageOptionSwitch;

