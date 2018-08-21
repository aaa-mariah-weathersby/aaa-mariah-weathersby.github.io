import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './input.radio.css'
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    // margin: theme.spacing.unit * 3,
  },
  formControlLabel: {
      margin: 'none',
  },
  group: {
    // margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {


constructor(props) {
    super(props);

    this.state = {
        value: this.props.default ? this.props.default : '',
    };
    
    this.radios = null;

}

  componentDidMount = () => {
    console.log(this.props.options)

    this.raidos =          
        Object.keys(this.props.options).map( key => (
            <FormControlLabel
                value={key}
                control={<Radio />}
                label={this.props.options[key]}
            />
        ))
    }

  handleChange = event => {
    this.setState(
      { value: event.target.value },
      () => {
        if (this.props.callback)
          this.props.callback(this)
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
      
      <form>

            {
                Object.keys(this.props.options).map( key => {

                  var currProp = this.props.options[key];
                  console.log("currProp: ", currProp)

                 return (
                  <label>
                    <div className={"add-on"}>
                      <div className={"add-on-wrapper"}>

                        <div className={"radio-set"}>
                          <input
                            type="radio"
                            name="radioSet"
                            value={currProp.value}
                          />
                          <div class="check"></div>
                        </div>

                        <div className={"membership-details-container"}>

                          <section className={"membership-details"}>
                            <h3>{currProp.title}</h3>

                            <span>
                              <h2>{currProp.price}</h2>

                              {
                                currProp.strike
                                ? <div className={"strike-through"}>
                                    <p>{currProp.strikeContent}</p>
                                  </div>
                                : null
                              }

                            </span>
                          </section>

                          <p className={"towing"}>{currProp.towingInfo}</p>
                          <p className={"dead-link"}>Learn more</p>

                          <p className={"discounts"}>$00.00 per year - policy discount applied</p>

                        </div>

                        </div>

                    </div>
                  </label>
                  )
              })
            }

        </form>

      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default RadioButtonsGroup;
