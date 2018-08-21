import React, { PropTypes } from 'react';
import s from '../../styles/core.scss';
import { convertCentsToCurrency } from '../../utils/stringFormatter';
import UtagHelper from '../../utils/utagHelper';

const PaymentSummaryFunctional = ({ headerTitle, paymentSummaryData, totalAmountTitle }) => {
  const paymentSummaryFunctionalClass = UtagHelper.getPlatform() === 'mobile'
    ? 'paymentSummaryFunctional'
    : 'paymentSummaryFunctional card mpp';
  let disclaimer;
  let amountDueSummary;
  if (paymentSummaryData.PriceCart.GrandTotalInCents > 0) {
    disclaimer = (
      <div id="paymentSummaryFunctionalDisclaimer" className="paymentSummaryFunctionalDisclaimer">
        The amount <span className="boldText">Due</span> must be paid today in order to enroll in the Monthly Payment Plan.
      </div>);
    amountDueSummary = (
      <div id="amountDueSummary" className="amountDueSummary">
        <span id="totalAmountTitle">{totalAmountTitle}</span>
        <span id="totalAmountDue" className={s.totalAmountDue}>{convertCentsToCurrency(paymentSummaryData.PriceCart.GrandTotalInCents)}</span>
      </div>
    );
  }
  return (
    <div id="paymentSummaryFunctionalContainer" className={paymentSummaryFunctionalClass}>
      <div className="paymentSummaryFunctionalHeader">
        <a id="anchor_payment_summary" />
        <div id="payment_summary_functional_title" >
          {headerTitle}
        </div>
      </div>
      {disclaimer}
      {amountDueSummary}
    </div>
  );
};

PaymentSummaryFunctional.propTypes = {
  headerTitle: PropTypes.string,
  totalAmountTitle: PropTypes.string,
  paymentSummaryData: PropTypes.shape({
    PriceCart: PropTypes.shape({
      GrandTotalInCents: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PaymentSummaryFunctional;
