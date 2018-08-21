import React, { PropTypes } from 'react';
import CardHeader from './cardHeader';
import { StringConstants, EndPoints, EnrollOption, UIModules, PaymentPlanType } from '../../constants';
import Button from './button';
import URLHelper from '../../utils/URLHelper';
import UtagHelper from '../../utils/utagHelper';
import HtmlTextFormatter from '../../utils/htmlTextFormatter';
import { convertCentsToCurrency } from '../../utils/stringFormatter';

const renderAutoPayOptions = (app, updateEnrollOption, enrollOption, discountInCents, callbacks,
  updateShowPriceCartWithAutopay, autoPayYesButtonText, autoPayNoButtonText, paymentPlanType) => {
  let acceptButtonText;
  let rejectButtonText;

  let yesButtonClass;
  let noButtonClass;
  let handleClickNoButton;
  let handleClickYesButton;

  if (enrollOption === EnrollOption.YES) {
    yesButtonClass = 'activeText';
  } else if (enrollOption === EnrollOption.NO) {
    noButtonClass = 'activeText';
  }

  if (app === 'olb') {
    acceptButtonText = autoPayYesButtonText || StringConstants.YES_AUTOPAY_OLB;
    rejectButtonText = autoPayNoButtonText || StringConstants.NO_AUTOPAY_OLB;
    handleClickNoButton = () => {
      updateEnrollOption(EnrollOption.NO, callbacks);
      updateShowPriceCartWithAutopay(false);
    };
    handleClickYesButton = () => {
      updateEnrollOption(EnrollOption.YES, callbacks);
      UtagHelper.linkAutoPayDisclaimerModal(paymentPlanType);
    };
  } else {
    // eslint-disable-next-line max-len
    acceptButtonText = autoPayYesButtonText || `${StringConstants.YES_AUTOPAY}${discountInCents ? StringConstants.YES_AUTOPAY_SAVE.replace('{1}', convertCentsToCurrency(discountInCents)) : ''}`;
    rejectButtonText = autoPayNoButtonText || StringConstants.NO_THANKS;
    handleClickNoButton = () => {
      updateEnrollOption(EnrollOption.NO, callbacks);
    };
    handleClickYesButton = () => {
      updateEnrollOption(EnrollOption.YES, callbacks);
    };
  }

  return (
    <div id="buttonContainer" className="buttonContainer">
      <Button
        action={handleClickYesButton}
        text={acceptButtonText}
        componentId="yesButton"
        classCSS={`optionButton ${yesButtonClass}`}
      />
      <Button
        action={handleClickNoButton}
        text={rejectButtonText}
        componentId="noButton"
        classCSS={`optionButton secondary ${noButtonClass}`}
      />
    </div>
  );
};

const renderDisclaimer = (app, paymentPlanType, updatePaymentPlanType, callbacks, autopayFullDisclaimerText, autopayInstallmentDisclaimerText) => {
  let disclaimerText;
  let termsAndConditionsURL;
  let manifestDisclaimerText;

  switch (app) {
    case 'olb':
      termsAndConditionsURL = `${EndPoints.paymentTermsAndConditionsURL}?variant=olb_`;

      if (paymentPlanType === PaymentPlanType.FULL) {
        termsAndConditionsURL += 'full';
        manifestDisclaimerText = autopayFullDisclaimerText;
      } else {
        termsAndConditionsURL += 'installment';
        manifestDisclaimerText = autopayInstallmentDisclaimerText;
      }
      disclaimerText = HtmlTextFormatter.formatText(manifestDisclaimerText || StringConstants.AUTOPAY_DISCLAIMER_OLB, [
        {
          key: 'save $22',
          bold: true,
        },
        {
          id: 'tnc',
          key: 'Read Terms and Conditions',
          callback: () => { URLHelper.gotoURLNewWindow(termsAndConditionsURL); },
        },
      ]);
      break;
    default:
      termsAndConditionsURL = `${EndPoints.paymentTermsAndConditionsURL}?variant=mmp`;
      if (paymentPlanType === PaymentPlanType.INSTALLMENT) {
        manifestDisclaimerText = autopayInstallmentDisclaimerText || StringConstants.AUTOPAY_DISCLAIMER_FOR_MONTHLY;
        disclaimerText = HtmlTextFormatter.formatText(manifestDisclaimerText, [
          {
            key: 'save $4.50 today',
            bold: true,
          },
          {
            id: 'tnc',
            key: 'Terms and Conditions',
            callback: () => { URLHelper.gotoURLNewWindow(termsAndConditionsURL); },
          },
          {
            id: 'annualPaymentPlanType',
            key: 'Annual Billing',
            callback: () => updatePaymentPlanType(PaymentPlanType.FULL),
          },
        ]);
      } else {
        manifestDisclaimerText = autopayFullDisclaimerText || StringConstants.AUTOPAY_DISCLAIMER;
        disclaimerText = HtmlTextFormatter.formatText(manifestDisclaimerText, [
          {
            key: 'save $4.50 today',
            bold: true,
          },
          {
            id: 'tnc',
            key: 'Read Terms and Conditions',
            callback: () => { URLHelper.gotoURLNewWindow(termsAndConditionsURL); },
          },
        ]);
      }
      break;
  }
  return disclaimerText;
};

const autoPaySelector = ({ updateEnrollOption, updatePaymentPlanType, enrollOption, incompleteModules,
  paymentPlanType, discountInCents, callbacks, updateShowPriceCartWithAutopay, autoPayHeaderText,
  autoPayYesButtonText, autoPayNoButtonText, autoPayYesButtonTextMMPMonthly, autoPayNoButtonTextMMPMonthly, autopayFullDisclaimerText, autopayInstallmentDisclaimerText }) => {
  let autoPayOptions;

  const autopaySelectorTitle = autoPayHeaderText ? `2. ${autoPayHeaderText}` : StringConstants.AUTOPAY_HEADER;

  const app = URLHelper.getCurrentPath(window.location);

  if (!(app === 'payment' && paymentPlanType === PaymentPlanType.INSTALLMENT)) {
    autoPayOptions = renderAutoPayOptions(app, updateEnrollOption, enrollOption, discountInCents, callbacks,
      updateShowPriceCartWithAutopay, autoPayYesButtonText, autoPayNoButtonText, paymentPlanType);
  } else {
    autoPayOptions = renderAutoPayOptions(app, updateEnrollOption, enrollOption, discountInCents, callbacks,
      updateShowPriceCartWithAutopay, autoPayYesButtonTextMMPMonthly, autoPayNoButtonTextMMPMonthly, paymentPlanType);
  }

  const disclaimerText = renderDisclaimer(app, paymentPlanType, updatePaymentPlanType, callbacks, autopayFullDisclaimerText, autopayInstallmentDisclaimerText);

  return (
    <div id="autopaySelector" className="autopaySelector card">
      <CardHeader id="auto_pay" header={autopaySelectorTitle} highlight={incompleteModules.indexOf(UIModules.ENROLL_OPTION) > -1} />
      {autoPayOptions}
      <div id="autopayDisclaimer" className="autopayDisclaimer">
        {disclaimerText}
      </div>
    </div>
  );
};

autoPaySelector.propTypes = {
  updateEnrollOption: PropTypes.func.isRequired,
  updatePaymentPlanType: PropTypes.func.isRequired,
  enrollOption: PropTypes.number,
  incompleteModules: PropTypes.arrayOf(PropTypes.string),
  paymentPlanType: PropTypes.number,
  discountInCents: PropTypes.number,
  callbacks: PropTypes.array,
  updateShowPriceCartWithAutopay: PropTypes.func,
  autoPayHeaderText: PropTypes.string,
  autoPayYesButtonText: PropTypes.string,
  autoPayNoButtonText: PropTypes.string,
  autoPayYesButtonTextMMPMonthly: PropTypes.string,
  autoPayNoButtonTextMMPMonthly: PropTypes.string,
  autopayFullDisclaimerText: PropTypes.string,
  autopayInstallmentDisclaimerText: PropTypes.string,
};

export default autoPaySelector;
