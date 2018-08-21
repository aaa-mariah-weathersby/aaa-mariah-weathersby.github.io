import React from 'react';
import PropTypes from 'prop-types';

import styles from './upgradeOptionsC.css';
import Switch from '../switch/switch'

class UpgradeOptionsC extends React.Component {

    state = {
      value: this.props.defaultVal ? this.props.defaultVal : ''
    };


    handleChange = (value) => {
      this.setState(
        { value: value },
      )

      if(this.props.callback)
        this.props.callback(this)
      
    }
  

  render = () => {

    var switches = 
    
      Object.keys(this.props.switch).map(
        currSwitch => {
          var curr = this.props.switch[currSwitch]

          return (
            <div 
              className={"add-on"}
              onClick={ el => this.handleChange(el.target.value) }
              key={`${curr.value}_key`}
            >
              <div className={"add-on-wrapper"}>

                <div className={"CTA-section"}>

                  <div className={"add-on-labels"}>
                      <h4>{curr.title}</h4>
                      <h2>
                        {curr.strikePrice 
                          ? <span className={"outer-strike"}>
                              <span className={"inner-strike"}>
                                {curr.strikePrice}
                              </span>
                            </span>
                          : null
                        }
                        {curr.price}
                      </h2>
                      <h4 className={"upgrade-opt-details"}>
                        {curr.optDetails}
                      </h4>
                      <p className={"dead-link"}>Learn more</p>
                  </div>

                  <div className={"check"}>
                    <Switch 
                      value={curr.value}
                      checked={this.state.value === curr.value ? true : false }
                      checkOverride={this.state.value === curr.value ? true : false }
                    />
                  </div>

                </div>

              <div className={"savings"}>
                <h5>{curr.additionalSavings} - policy discount applied</h5>
              </div>

            </div>

          </div>
          )
        }
      )          
    


  
    return (

      <div className={"coverage-option-container"}>
        
            {switches}          

      </div>

    )
}

};

UpgradeOptionsC.propTypes = {
};

export default UpgradeOptionsC;

