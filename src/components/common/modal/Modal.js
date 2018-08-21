import React from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Accident from './modalScreens/accident/Accident'
import DL from './modalScreens/carLoan/CarLoan'
import Dislaimer from './modalScreens/autoPayConditions/autoPayConditions'

import styles from './modal.css';
import '../../routes/animations.css'
import X from '../../../images/Exit-X/x.png'


const Modal = (props) => { 

  return (
    <div className={"modal-viewport"}>

            <div className={"modal-panel"}>

                <img id={"modal-exit"} className={"link"} src={X}/>

                <div className={"content-viewport"}>

                    

                    {
                        (props.view == 1)
                        ? <Accident navAction={props.changeView}/>
                        : (props.view == 2) 
                            ? <DL navAction={props.exitModal}/>
                            : <Dislaimer navAction={props.exitModal}/>
                    }
                    
                
                </div>

            </div>

    </div>
  )

};

Modal.propTypes = {

};

export default Modal;
