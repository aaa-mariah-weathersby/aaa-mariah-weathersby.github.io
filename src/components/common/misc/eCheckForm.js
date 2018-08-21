import React, { PropTypes } from 'react';
import { convertCentsToCurrency } from '../../utils/stringFormatter';
import { StringConstants, PaymentInputTypes } from '../../constants';
import { default as PaymentMethodInput } from './paymentMethodInput';

const ECheckForm = (props) => {
  const cancelPaymentButton = props.hideCancelPaymentButton
    ? undefined
    : <button id="secondaryPaymentMethod" className="secondary" onClick={() => { props.onCancelClick(); }}>{StringConstants.CANCEL}</button>;
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); }}>
      <div className="eCheckContainer">
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateECheckInfo({ name: v });
            props.updateSoftErrors(PaymentInputTypes.NAME, v);
            /* istanbul ignore else */
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.eCheckInfo.name}
          inputType={PaymentInputTypes.NAME}
          accountNumber={props.eCheckInfo.accountNumber}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.NAME)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.NAME, props.eCheckInfo.name)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateECheckInfo({ routingNumber: v });
            props.updateSoftErrors(PaymentInputTypes.ROUTING_NUMBER, v);
            /* istanbul ignore else */
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.eCheckInfo.routingNumber}
          inputType={PaymentInputTypes.ROUTING_NUMBER}
          accountNumber={props.eCheckInfo.routingNumber}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.ROUTING_NUMBER)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.ROUTING_NUMBER, props.eCheckInfo.routingNumber)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateECheckInfo({ accountNumber: v });
            props.updateSoftErrors(PaymentInputTypes.ACCOUNT_NUMBER, v);
            /* istanbul ignore else */
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.eCheckInfo.accountNumber}
          inputType={PaymentInputTypes.ACCOUNT_NUMBER}
          accountNumber={props.eCheckInfo.accountNumber}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.ACCOUNT_NUMBER)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.ACCOUNT_NUMBER, props.eCheckInfo.accountNumber)}
          paymentMethod={props.paymentMethod}
        />
        <PaymentMethodInput
          onChange={(v, updatedIncompleteModules) => {
            props.updateECheckInfo({ confirmAccountNumber: v });
            props.updateSoftErrors(PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER, v, props.eCheckInfo.accountNumber);
            /* istanbul ignore else */
            if (updatedIncompleteModules && props.updateIncompleteModules) {
              props.updateIncompleteModules(updatedIncompleteModules);
            }
          }}
          inputContent={props.eCheckInfo.confirmAccountNumber}
          inputType={PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER}
          accountNumber={props.eCheckInfo.confirmAccountNumber}
          hasSoftError={props.softErrorInfo[props.paymentMethod].includes(PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER)}
          incompleteModules={props.incompleteModules}
          updateIncompleteModules={props.updateIncompleteModules}
          onBlur={() => props.onBlur(PaymentInputTypes.CONFIRM_ACCOUNT_NUMBER, props.eCheckInfo.confirmAccountNumber, props.eCheckInfo.accountNumber)}
          paymentMethod={props.paymentMethod}
        />
      </div>
      <div className="eCheckContainer">
        <div className="echeckImage">
          <img src="images/echeck.png" alt="echeck" />
        </div>
      </div>
      {
        props.allowAccountStorage === true &&
          <div className="savePayContainer">
            <div className="checkboxContainer">
              <input type="checkbox" className="savePaymentCheckbox" onChange={props.toggleSavePayment} checked={props.savePaymentChecked} />
              <img id="checkboxImage" className={props.checkboxImageClass} src="images/check_box.svg" onClick={props.toggleSavePayment} alt="" />
            </div>
            <label className="savePaymentInfoLabel" id="savePaymentInfo" onClick={props.toggleSavePayment}>{StringConstants.SAVE_PAYMENT_INFO}</label>
          </div>
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

ECheckForm.propTypes = {
  disclaimer: PropTypes.string.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
  grandTotalInCents: PropTypes.number,
  onCancelClick: PropTypes.func.isRequired,
  allowAccountStorage: PropTypes.bool.isRequired,
  toggleSavePayment: PropTypes.func.isRequired,
  savePaymentChecked: PropTypes.bool,
  checkboxImageClass: PropTypes.string,
  updateSoftErrors: PropTypes.func.isRequired,
  updateIncompleteModules: PropTypes.func.isRequired,
  eCheckInfo: PropTypes.object.isRequired,
  softErrorInfo: PropTypes.object.isRequired,
  incompleteModules: PropTypes.array.isRequired,
  onBlur: PropTypes.func.isRequired,
  paymentMethod: PropTypes.number,
  updateECheckInfo: PropTypes.func.isRequired,
  hideCancelPaymentButton: PropTypes.bool,
};

export default ECheckForm;
