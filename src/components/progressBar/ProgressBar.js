import React, { Component } from 'react';
import { connect } from 'react-redux'

import './progressBar.css';

import constants from '../routes/constants'

class ProgressBar extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            
        };

    }

    componentDidMount = () => {
    }

    // convertProgress = () => {
    //     const totalSteps = Object.keys(constants.STEPS).length
    //     const currentStep = ""
    // }


    render() {

        const appSequence = constants.STEPS
        const appSequenceVAL = Object.keys(constants.STEPS).length - 1       
        
        var curProgress = appSequence[this.props.currentRoute].val
        var progPercent = Math.floor((curProgress/appSequenceVAL) * 100)
        progPercent = progPercent.toString() + "%"

        console.log("loaderVal: ", appSequenceVAL, progPercent)


        return (
            <div id={"ProgressBar-Wrapper"} className={"wrapper"}>
                <div 
                    id={"progress-gauge"} 
                    style={{
                        width: progPercent
                    }}
                >
                </div>
            </div>
        );  
    }
}

const mapStateToProps = state => {
  return {
    currentRoute: state.route.currentRoute,
    currentProgress: state.progress,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBar);
