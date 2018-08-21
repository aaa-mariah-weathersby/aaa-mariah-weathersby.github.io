import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './styles/ButtonLabel.scss';
import cx from 'classnames';
import clone from 'clone';


export class ButtonLabel extends Component {

  render() {
    
    return (
      // <h4 className={`${style.button_label} ${this.props.classes} button_label`}>
        <h4 className={cx(style.button_label) + ` ${this.props.classes} button_label`}>
          {this.props.label}
        </h4>
    )
  }
}

ButtonLabel.propTypes = {
  classes: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default ButtonLabel;