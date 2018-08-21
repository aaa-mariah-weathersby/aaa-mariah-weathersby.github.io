import React, { PropTypes, Component } from 'react';
import { StringConstants } from '../../constants';
import s from '../../styles/core.scss';
import ScrollHelper from '../../utils/scrollHelper';

class AutopayDisclaimerModal extends Component {
  static propTypes = {
    acceptDisclaimer: PropTypes.func.isRequired,
    disclaimer: PropTypes.array.isRequired,
    callbacks: PropTypes.array,
    phoneNumber: PropTypes.string,
  }

  componentWillMount() {
    ScrollHelper.setScrolling(false, s.openModal);
  }

  componentWillUnmount() {
    ScrollHelper.setScrolling(true, s.openModal);
  }

  render() {
    return (
      <div id="autopayDisclaimerModal" className={s.autopayDisclaimerModal}>
        <div id="header" className={s.autopayDisclaimerHeader}>
          {StringConstants.AUTOPAY_DISCLAIMER_TITLE}
        </div>
        <div id="autopayDisclaimer" className={s.autopayDisclaimer}>
          {this.props.disclaimer}
        </div>
        <div className={s.buttonContainer}>
          <div
            id="agreeButton"
            className={`${s.optionButton} ${s.agreeButton}`}
            onClick={() => { this.props.acceptDisclaimer(true, this.props.callbacks); }}
          >
            {StringConstants.AGREE}
          </div>
          <div
            id="disagreeButton"
            className={`${s.optionButton} ${s.disagreeButton}`}
            onClick={() => { this.props.acceptDisclaimer(false); }}
          >
            {StringConstants.DISAGREE}
          </div>
        </div>
      </div>
    );
  }
}

export default AutopayDisclaimerModal;
