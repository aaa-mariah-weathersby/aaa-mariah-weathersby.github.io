import React, { Component, PropTypes } from 'react';
import { PaymentInputTypes, InputConstants, UIModules, PaymentMethod } from '../../constants';
import CreditCardValidator from 'creditcardutils'; // 'credit-card-validator';
import paymentMethodValidator from '../../utils/paymentMethodValidator';
import InputField from './inputField';

export default class PaymentMethodInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    inputContent: PropTypes.string,
    inputType: PropTypes.number,
    cardNumber: PropTypes.string,
    hasSoftError: PropTypes.bool,
    incompleteModules: PropTypes.arrayOf(PropTypes.string),
    updateIncompleteModules: PropTypes.func,
    onBlur: PropTypes.func.isRequired,
    paymentMethod: PropTypes.number,
  }

  constructor() {
    super();
    this.state = {};
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.getIconForCard = this.getIconForCard.bind(this);
    this.formatCardNumber = this.formatCardNumber.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.getUpdatedIncompleteModules = this.getUpdatedIncompleteModules.bind(this);
    this.invokeUpdateIncompleteModules = this.invokeUpdateIncompleteModules.bind(this);
  }


  onFocus() {
    this.setState({ focused: true });
  }

  onBlur() {
    this.props.onBlur();
    this.setState({ focused: false });
  }

  getIconForCard(cardName) {
    switch (cardName) {
      case 'visa':
        return (<img className="creditCardIcon" src="images/paymentIconVisa.svg" alt="visa" />);
      case 'americanexpress':
      case 'amex':
        return (<img className="creditCardIcon" src="images/paymentIconAmex.svg" alt="amex" />);
      case 'discover':
      case 'dinersclub':
      case 'jcb':
        return (<img className="creditCardIcon" src="images/paymentIconDiscover.svg" alt="discover" />);
      case 'maestro':
      case 'mastercard':
        return (<img className="creditCardIcon" src="images/paymentIconMastercard.svg" alt="mastercard" />);
      default:
        return null;
    }
  }

  getUpdatedIncompleteModules() {
    let uiModulePaymentMethod = undefined;
    switch (this.props.paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_CREDIT;
        break;
      case PaymentMethod.ELECTRONIC_CHECK:
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_ECHECK;
        break;
      case PaymentMethod.DEBIT_CARD:
      default: {
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_DEBIT;
        break;
      }
    }
    const remainingIncompleteModules = this.props.incompleteModules.filter(UImodule => {
      return uiModulePaymentMethod !== UImodule;
    });
    return remainingIncompleteModules;
  }

  invokeUpdateIncompleteModules() {
    const updatedIncompleteModules = this.getUpdatedIncompleteModules();
    let uiModulePaymentMethod = undefined;
    switch (this.props.paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_CREDIT;
        break;
      case PaymentMethod.ELECTRONIC_CHECK:
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_ECHECK;
        break;
      case PaymentMethod.DEBIT_CARD:
      default: {
        uiModulePaymentMethod = UIModules.PAYMENT_METHOD_DEBIT;
        break;
      }
    }

    if (!this.props.hasSoftError && updatedIncompleteModules.length > 0
      && updatedIncompleteModules.includes(uiModulePaymentMethod) && this.props.inputContent.length > 0) {
      this.props.updateIncompleteModules(updatedIncompleteModules);
    }
  }

  formatCardNumber(cardNumber) {
    return CreditCardValidator.formatCardNumber(cardNumber);
  }

  formatDate(dateString) {
    if (!dateString) {
      return '';
    }
    const MAX_MONTH_NUMBERS = 2;
    const MAX_YEAR_NUMBERS = 2;
    let formattedString = '';
    let numbersAdded = 0;
    let passedSlash = false;
    for (let i = 0; i < dateString.length; ++i) {
      const curChar = dateString.charAt(i);
      if (curChar >= '0' && curChar <= '9') {
        ++numbersAdded;
        formattedString += curChar;
        if (numbersAdded === MAX_MONTH_NUMBERS && !passedSlash && i < dateString.length - 1) {
          formattedString += '/';
          passedSlash = true;
        }
        if (numbersAdded >= MAX_MONTH_NUMBERS + MAX_YEAR_NUMBERS) {
          return formattedString;
        }
      } else if (curChar === '/' && !passedSlash) {
        passedSlash = true;
        formattedString += '/';
      }
    }
    return formattedString;
  }

  render() {
    let title = '';
    let errorMessage = '';
    let placeholder = '';
    let maxLength = '';
    let typeAttr = 'text';
    let cardIcon = null;
    let splitDate;
    let updatedIncompleteModules;

    let inputFieldClass = 'inputField';
    const labelClass = this.state.focused ? 'fieldTitle focused' : 'fieldTitle';

    if (this.props.inputContent || this.state.focused) {
      inputFieldClass += ' active';
    }

    if (this.props.hasSoftError) {
      inputFieldClass += ' invalid';
    }

    let onInput = (v) => {
      this.props.onChange(v, updatedIncompleteModules);
    };

    switch (this.props.inputType) {
      case PaymentInputTypes.NAME:
        if (this.props.paymentMethod && this.props.paymentMethod === PaymentMethod.ELECTRONIC_CHECK) {
          title = InputConstants.NAME_ON_ACCOUNT;
        } else {
          title = InputConstants.NAME;
        }
        errorMessage = 'Invalid Name';
        maxLength = '31';
        onInput = (v) => {
          /* istanbul ignore else */
          if (paymentMethodValidator.onlyHasNameCharacters(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      case PaymentInputTypes.CREDIT_CARD_NUMBER:
      case PaymentInputTypes.DEBIT_CARD_NUMBER:
        typeAttr = 'tel';
        title = this.props.inputType === PaymentInputTypes.CREDIT_CARD_NUMBER ? InputConstants.CREDIT_CARD_NUMBER : InputConstants.DEBIT_CARD_NUMBER;
        errorMessage = this.props.inputType === PaymentInputTypes.CREDIT_CARD_NUMBER ? 'Invalid Credit Card Number' : 'Invalid Debit Card Number';
        onInput = (v) => {
          const formattedV = this.formatCardNumber(v);
          updatedIncompleteModules = this.getUpdatedIncompleteModules();
          this.props.onChange(formattedV, updatedIncompleteModules);
        };
        if (this.props.cardNumber) {
          const cardName = CreditCardValidator.parseCardType(this.props.cardNumber);

          if (cardName) {
            cardIcon = this.getIconForCard(cardName);
          }
        }
        break;
      case PaymentInputTypes.EXPIRATION_DATE:
        title = InputConstants.EXPIRATION_DATE;
        placeholder = InputConstants.EXP_PLACEHOLDER;
        errorMessage = 'Invalid Expiration Date';
        splitDate = this.props.inputContent ? this.props.inputContent.split('/') : '';
        if (!this.state.focused && splitDate.length > 0 && splitDate[0].length === 1) {
          this.props.onChange(`0${this.props.inputContent}`);
        }
        onInput = (v) => {
          const formattedV = this.formatDate(v);
          updatedIncompleteModules = this.getUpdatedIncompleteModules();
          this.props.onChange(formattedV, updatedIncompleteModules);
        };
        break;
      case PaymentInputTypes.SECURITY_CODE:
        typeAttr = 'tel';
        title = InputConstants.SECURITY_CODE;
        errorMessage = 'Invalid Security Code';
        maxLength = '4';
        placeholder = InputConstants.SECURITY_CODE_PLACEHOLDER;
        onInput = (v) => {
          if (paymentMethodValidator.onlyHasNumbers(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      case PaymentInputTypes.ZIP_CODE:
        typeAttr = 'tel';
        title = InputConstants.BILLING_ZIP_CODE;
        errorMessage = 'Invalid Zip Code';
        maxLength = '5';
        onInput = (v) => {
          /* istanbul ignore else */
          if (paymentMethodValidator.onlyHasNumbers(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      case PaymentInputTypes.ROUTING_NUMBER:
        title = InputConstants.ROUTING_NUMBER;
        errorMessage = 'Invalid Routing Number';
        maxLength = '9';
        onInput = (v) => {
          /* istanbul ignore else */
          if (paymentMethodValidator.onlyHasNumbers(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      case PaymentInputTypes.ACCOUNT_NUMBER:
        title = InputConstants.ACCOUNT_NUMBER;
        errorMessage = 'Invalid Account Number';
        maxLength = '17';
        onInput = (v) => {
          /* istanbul ignore else */
          if (paymentMethodValidator.onlyHasNumbers(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      case PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER:
        title = InputConstants.CONFIRM_ACCOUNT_NUMBER;
        errorMessage = 'Account Numbers do not match';
        maxLength = '17';
        onInput = (v) => {
          /* istanbul ignore else */
          if (paymentMethodValidator.onlyHasNumbers(v)) {
            updatedIncompleteModules = this.getUpdatedIncompleteModules();
            this.props.onChange(v, updatedIncompleteModules);
          }
        };
        break;
      default:
        break;
    }

    this.invokeUpdateIncompleteModules(updatedIncompleteModules);

    return (
      <InputField
        className={inputFieldClass}
        labelClassName={labelClass}
        title={title}
        placeholder={placeholder}
        value={this.props.inputContent}
        maxLength={maxLength}
        icon={cardIcon}
        errorMessage={errorMessage}
        onChange={(e) => { onInput(e.target.value); }}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        typeAttr={typeAttr}
      />
    );
  }
}
