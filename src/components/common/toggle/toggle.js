import React from 'react';
import PropTypes from 'prop-types';

import './toggle.css'

const Toggle = (props) => {
  
  const evalToggle = (e) => {
    const target = e.currentTarget;
    const targetValue = target.getAttribute('value');

    if (!target.classList.contains('active')) {
      if (props.opt1.value === targetValue) {
        if (props.toggleAction_opt1) {
          props.toggleAction_opt1(e);
        }

        e.currentTarget.classList.add('active');
        e.currentTarget.nextSibling.classList.remove('active');
      } else {
        if (props.toggleAction_opt2) {
          props.toggleAction_opt2(e);
        }

        e.currentTarget.classList.add('active');
        e.currentTarget.previousSibling.classList.remove('active');
      }
    }

  };

  return (
    <div>
      <label className={"toggle-label"}>{props.label}</label>
      <div className="toggle">
        <div
          className={props.opt1_classes + ` toggle-opt ${props.currentOption !== undefined && props.currentOption.value === props.opt1.value ? 'active' : ''}`}
          value={props.opt1.value}
          onClick={(e) => evalToggle(e)}
          name={props.opt1.name}
        >{props.opt1.title}</div>
        <div
          className={props.opt2_classes + ` toggle-opt 
            ${props.currentOption !== undefined && props.currentOption.value === props.opt2.value ? 'active' : ''}
          `}
          value={props.opt2.value}
          onClick={(e) => evalToggle(e)}
          name={props.opt2.name}
        >{props.opt2.title}</div>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  opt1: PropTypes.shape({
    value: PropTypes.string.isRequired,
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
  }),
  opt2: PropTypes.shape({
    value: PropTypes.string.isRequired,
    image: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
  }),
  toggleAction_opt1: PropTypes.func,
  toggleAction_opt2: PropTypes.func,
};

export default Toggle;
