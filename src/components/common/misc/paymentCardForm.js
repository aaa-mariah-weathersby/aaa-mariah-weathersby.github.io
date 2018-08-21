import React, { PropTypes } from 'react';
import { convertCentsToCurrency } from '../../utils/stringFormatter';
import { StringConstants, PaymentInputTypes } from '../../constants';
import { default as PaymentMethodInput } from './paymentMethodInput';

const PaymentCardForm = (props) => {
  const cancelPaymentButton = props.hideCancelPaymentButton
    ? undefined
    : <button type="button" id="secondaryPaymentMethod" className="secondary" onClick={() => { props.onCancelClick(); }}>{StringConstants.CANCEL}</button>;
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); }}>
      <div className="desktopInlineContainer inputContainer">
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateCardInfo({ name: v });
            props.updateSoftErrors(PaymentInputTypes.NAME, v);
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.cardInfo.name}
          inputType={PaymentInputTypes.NAME}
          cardNumber={props.cardInfo.number}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.NAME)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.NAME, props.cardInfo.name)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateCardInfo({ number: v });
            props.updateSoftErrors(props.cardInputType, v);
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.cardInfo.number}
          inputType={props.cardInputType}
          cardNumber={props.cardInfo.number}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(props.cardInputType)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(props.cardInputType, props.cardInfo.number)}
          paymentMethod={props.paymentMethod}
        />
      </div>
      <div className="inlineContainer smallSizeInputContainer">
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateCardInfo({ expDt: v });
            props.updateSoftErrors(PaymentInputTypes.EXPIRATION_DATE, v);
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.cardInfo.expDt}
          inputType={PaymentInputTypes.EXPIRATION_DATE}
          cardNumber={props.cardInfo.number}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.EXPIRATION_DATE)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.EXPIRATION_DATE, props.cardInfo.expDt)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateCardInfo({ securityCode: v });
            props.updateSoftErrors(PaymentInputTypes.SECURITY_CODE, v);
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.cardInfo.securityCode}
          inputType={PaymentInputTypes.SECURITY_CODE}
          cardNumber={props.cardInfo.number}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.SECURITY_CODE)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.SECURITY_CODE, props.cardInfo.securityCode)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateCardInfo({ zipCode: v });
            props.updateSoftErrors(PaymentInputTypes.ZIP_CODE, v);
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.cardInfo.zipCode}
          inputType={PaymentInputTypes.ZIP_CODE}
          cardNumber={props.cardInfo.number}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.ZIP_CODE)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.ZIP_CODE, props.cardInfo.zipCode)}
          paymentMethod={props.paymentMethod}
        />
      </div>
      {
        props.allowAccountStorage === true &&
        (<div className="savePayContainer">
          <div className="checkboxContainer">
            <input type="checkbox" className="savePaymentCheckbox" onChange={props.toggleSavePayment} checked={props.savePaymentChecked} />
            <img id="checkboxImage" className={props.checkboxImageClass} src="images/check_box.svg" onClick={props.toggleSavePayment} alt="" />
          </div>
          <label className="savePaymentInfoLabel" id="savePaymentInfo" onClick={props.toggleSavePayment}>
              {props.savePaymentForFutureFlag ? props.savePaymentForFutureFlag : StringConstants.SAVE_PAYMENT_INFO}</label>
        </div>)
      }
      <p id="disclaimerPaymentMethod" className="disclaimer">
        {props.disclaimer}
      </p>
      <div className="actionContainer">

        <button id="primaryPaymentMethod" className="primary" onClick={props.onSubmitClick}>
          <img id="lockImage" className="lockImage" src="images/lock.svg" alt="" />
          {StringConstants.PAY_NOW.replace('{1}', props.grandTotalInCents ? `${convertCentsToCurrency(props.grandTotalInCents)} ` : '')}
        </button>
        {cancelPaymentButton}
      </div>
    </form>
  );
};

PaymentCardForm.propTypes = {
  updateCardInfo: PropTypes.func.isRequired,
  updateSoftErrors: PropTypes.func.isRequired,
  updateIncompleteModules: PropTypes.func.isRequired,
  cardInfo: PropTypes.shape(
    {
      expDt: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
      securityCode: PropTypes.string,
      zipCode: PropTypes.string,
    }
  ),
  softErrorInfo: PropTypes.object,
  paymentMethod: PropTypes.number,
  incompleteModules: PropTypes.array,
  onBlur: PropTypes.func,
  cardInputType: PropTypes.number,
  allowAccountStorage: PropTypes.bool,
  toggleSavePayment: PropTypes.func,
  savePaymentChecked: PropTypes.bool,
  checkboxImageClass: PropTypes.string,
  disclaimer: PropTypes.string,
  onSubmitClick: PropTypes.func,
  grandTotalInCents: PropTypes.number,
  hideCancelPaymentButton: PropTypes.bool,
  onCancelClick: PropTypes.func,
  savePaymentForFutureFlag: PropTypes.string,
};
export default PaymentCardForm;
