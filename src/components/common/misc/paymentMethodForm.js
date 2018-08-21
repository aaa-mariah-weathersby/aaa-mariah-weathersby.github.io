import React, { PropTypes } from 'react';
import CardHeader from './cardHeader';
import {
  PaymentMethod,
  StringConstants,
  PaymentInputTypes,
  UIModules,
  AllowPaymentMethodCode,
} from '../../constants';
import paymentMethodValidator from '../../utils/paymentMethodValidator';
import ECheckForm from './eCheckForm';
import PaymentCardForm from './paymentCardForm';

const PaymentMethodForm = (
  {
    cardInfo,
    eCheckInfo,
    updateECheckInfo,
    updateCardInfo,
    toggleSavePayment,
    savePaymentChecked,
    updatePaymentMethod,
    paymentMethod,
    allowAccountStorage,
    onPayClick,
    onCancelClick,
    disclaimer,
    incompleteModules,
    grandTotalInCents,
    softErrorInfo,
    handleSoftError,
    updateIncompleteModules,
    allowedPaymentMethods,
    hideCancelPaymentButton,
    header,
    subheader,
    savePaymentForFutureFlag,
  }) => {
  let checkboxImageClass = 'checkboxImage';
  if (!savePaymentChecked) {
    checkboxImageClass += ' unchecked';
  }

  const cardInputType = paymentMethod === PaymentMethod.CREDIT_CARD
    ? PaymentInputTypes.CREDIT_CARD_NUMBER
    : PaymentInputTypes.DEBIT_CARD_NUMBER;

  const addToSoftErrors = (paymentInputType) => {
    const updatedSoftErrors = {
      ...softErrorInfo,
    };

    if (Array.isArray(paymentInputType)) {
      updatedSoftErrors[paymentMethod] = [...paymentInputType];
    } else {
      if (softErrorInfo[paymentMethod].includes(paymentInputType)) {
        return;
      }

      updatedSoftErrors[paymentMethod] = [...softErrorInfo[paymentMethod], paymentInputType];
    }
    handleSoftError(updatedSoftErrors);
  };

  const removeFromSoftErrors = (paymentInputType) => {
    if (!softErrorInfo[paymentMethod].includes(paymentInputType)) {
      return;
    }

    const updatedSoftErrors = {
      ...softErrorInfo,
    };
    updatedSoftErrors[paymentMethod] = softErrorInfo[paymentMethod].filter(softErrorInput => {
      return softErrorInput !== paymentInputType && softErrorInput !== PaymentInputTypes.UNKNOWN;
    });
    handleSoftError(updatedSoftErrors);
  };

  const validateAllFields = () => {
    const invalidInputs = [];

    if (paymentMethod === PaymentMethod.ELECTRONIC_CHECK) {
      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.NAME, eCheckInfo.name)) {
        invalidInputs.push(PaymentInputTypes.NAME);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.ROUTING_NUMBER, eCheckInfo.routingNumber)) {
        invalidInputs.push(PaymentInputTypes.ROUTING_NUMBER);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.ACCOUNT_NUMBER, eCheckInfo.accountNumber)) {
        invalidInputs.push(PaymentInputTypes.ACCOUNT_NUMBER);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER, eCheckInfo.confirmAccountNumber, undefined, eCheckInfo.accountNumber)
        || eCheckInfo.confirmAccountNumber !== eCheckInfo.accountNumber) {
        invalidInputs.push(PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER);
      }
    } else {
      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.NAME, cardInfo.name, cardInfo.number)) {
        invalidInputs.push(PaymentInputTypes.NAME);
      }

      if (!paymentMethodValidator.isValidProperty(cardInputType, cardInfo.number, cardInfo.number)) {
        invalidInputs.push(cardInputType);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.EXPIRATION_DATE, cardInfo.expDt, cardInfo.number)) {
        invalidInputs.push(PaymentInputTypes.EXPIRATION_DATE);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.SECURITY_CODE, cardInfo.securityCode, cardInfo.number)) {
        invalidInputs.push(PaymentInputTypes.SECURITY_CODE);
      }

      if (!paymentMethodValidator.isValidProperty(PaymentInputTypes.ZIP_CODE, cardInfo.zipCode, cardInfo.number)) {
        invalidInputs.push(PaymentInputTypes.ZIP_CODE);
      }
    }

    if (invalidInputs.length > 0) {
      addToSoftErrors(invalidInputs);
      return false;
    }
    return true;
  };

  const updateSoftErrors = (paymentInputType, inputValue, compareInput) => {
    const cardNumber = cardInfo ? cardInfo.number : undefined;
    if (!paymentMethodValidator.isPartOfValidProperty(paymentInputType, inputValue, cardNumber, compareInput)) {
      addToSoftErrors(paymentInputType);
    } else {
      removeFromSoftErrors(paymentInputType);
    }
  };

  const onBlur = (paymentInputType, inputValue, compareInput) => {
    const cardNumber = cardInfo ? cardInfo.number : undefined;
    if (!paymentMethodValidator.isValidProperty(paymentInputType, inputValue, cardNumber, compareInput) && inputValue.length > 0) {
      addToSoftErrors(paymentInputType);
    }
  };

  const onSubmitClick = () => {
    onPayClick(validateAllFields());
  };

  const updatePaymentMethodTabsList = () => {
    let allowedMethods = allowedPaymentMethods;
    if (allowedMethods === undefined || allowedMethods.length === 0) {
      allowedMethods = [AllowPaymentMethodCode.CREDIT, AllowPaymentMethodCode.DEBIT];
    }
    const tabsList = [];
    if (allowedMethods.includes(AllowPaymentMethodCode.DEBIT)) {
      tabsList.push({
        id: 'debitCard',
        title: StringConstants.DEBIT_CARD,
        onClick: () => { updatePaymentMethod(PaymentMethod.DEBIT_CARD); },
        active: paymentMethod === PaymentMethod.DEBIT_CARD,
      });
    }
    if (allowedMethods.includes(AllowPaymentMethodCode.CREDIT)) {
      tabsList.push({
        id: 'creditCard',
        title: StringConstants.CREDIT_CARD,
        onClick: () => { updatePaymentMethod(PaymentMethod.CREDIT_CARD); },
        active: paymentMethod === PaymentMethod.CREDIT_CARD,
      });
    }
    if (allowedMethods.includes(AllowPaymentMethodCode.ECHECK)) {
      tabsList.push({
        id: 'eCheck',
        title: StringConstants.ELECTRONIC_CHECK,
        onClick: () => { updatePaymentMethod(PaymentMethod.ELECTRONIC_CHECK); },
        active: paymentMethod === PaymentMethod.ELECTRONIC_CHECK,
      });
    }

    return tabsList;
  };

  let doHighlight = false;
  switch (paymentMethod) {
    case PaymentMethod.CREDIT_CARD:
      doHighlight = incompleteModules.includes(UIModules.PAYMENT_METHOD_CREDIT);
      break;
    case PaymentMethod.DEBIT_CARD:
      doHighlight = incompleteModules.includes(UIModules.PAYMENT_METHOD_DEBIT);
      break;
    case PaymentMethod.ELECTRONIC_CHECK:
      doHighlight = incompleteModules.includes(UIModules.PAYMENT_METHOD_ECHECK);
      break;
    default:
      break;
  }

  let component;
  switch (paymentMethod) {
    case PaymentMethod.CREDIT_CARD:
    case PaymentMethod.DEBIT_CARD:
      component =
      (<PaymentCardForm
        updateCardInfo={updateCardInfo}
        updateSoftErrors={updateSoftErrors}
        updateIncompleteModules={updateIncompleteModules}
        cardInfo={cardInfo}
        softErrorInfo={softErrorInfo}
        paymentMethod={paymentMethod}
        incompleteModules={incompleteModules}
        onBlur={onBlur}
        cardInputType={cardInputType}
        allowAccountStorage={allowAccountStorage}
        toggleSavePayment={toggleSavePayment}
        savePaymentChecked={savePaymentChecked}
        checkboxImageClass={checkboxImageClass}
        disclaimer={disclaimer}
        onSubmitClick={onSubmitClick}
        grandTotalInCents={grandTotalInCents}
        hideCancelPaymentButton={hideCancelPaymentButton}
        onCancelClick={onCancelClick}
        savePaymentForFutureFlag={savePaymentForFutureFlag}
      />);
      break;
    case PaymentMethod.ELECTRONIC_CHECK:
      component =
    (<ECheckForm
      disclaimer={disclaimer}
      onSubmitClick={onSubmitClick}
      grandTotalInCents={grandTotalInCents}
      onCancelClick={onCancelClick}
      allowAccountStorage={allowAccountStorage}
      toggleSavePayment={toggleSavePayment}
      savePaymentChecked={savePaymentChecked}
      checkboxImageClass={checkboxImageClass}
      updateSoftErrors={updateSoftErrors}
      updateIncompleteModules={updateIncompleteModules}
      eCheckInfo={eCheckInfo}
      softErrorInfo={softErrorInfo}
      incompleteModules={incompleteModules}
      onBlur={onBlur}
      paymentMethod={paymentMethod}
      updateECheckInfo={updateECheckInfo}
      hideCancelPaymentButton={hideCancelPaymentButton}
    />);
      break;
    default:
      component = <div>Have no idea what is that</div>;
      break;
  }

  return (
    <div id="paymentMethodForm" className="card paymentMethodForm">
      <CardHeader
        id="payment_method"
        // header={StringConstants.PAYMENT_METHOD_HEADER}
        header={header === undefined ? StringConstants.PAYMENT_METHOD_HEADER : header}
        subheader={subheader}
        highlight={doHighlight}
        tabs={updatePaymentMethodTabsList()}
      />
      {component}
    </div>
  );
};

PaymentMethodForm.propTypes = {
  cardInfo: PropTypes.shape(),
  updateCardInfo: PropTypes.func.isRequired,
  toggleSavePayment: PropTypes.func.isRequired,
  savePaymentChecked: PropTypes.bool,
  updatePaymentMethod: PropTypes.func.isRequired,
  paymentMethod: PropTypes.number,
  allowAccountStorage: PropTypes.bool.isRequired,
  onPayClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  disclaimer: PropTypes.string.isRequired,
  incompleteModules: PropTypes.arrayOf(PropTypes.string),
  grandTotalInCents: PropTypes.number,
  softErrorInfo: PropTypes.shape(),
  handleSoftError: PropTypes.func,
  updateIncompleteModules: PropTypes.func,
  hasCardSoftError: PropTypes.func,
  allowedPaymentMethods: PropTypes.array,
  hideCancelPaymentButton: PropTypes.bool,
  eCheckInfo: PropTypes.shape({
    name: PropTypes.string,
    routingNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    confirmAccountNumber: PropTypes.string,
  }),
  updateECheckInfo: PropTypes.func.isRequired,
  header: PropTypes.string,
  subheader: PropTypes.string,
  savePaymentForFutureFlag: PropTypes.string,
};


export default PaymentMethodForm;
