import React, { PropTypes } from 'react';
import { StringConstants, Links } from '../../constants';
import s from '../../styles/core.scss';
// import paymentLogoImage from '../../assets/images/paymentLogo.svg';

const PaymentHeader = ({ clubCode }) => {
  let index = '';
  if (clubCode) index = `.${clubCode}`;
  const paymentLogoImage = `images/paymentLogo${index}.svg`;

  return (
    <div
      id="paymentHeaderContainer"
      className={s.paymentHeaderContainer}
    >
      <div className="paymentLogo">
        <a href={Links.HOME_PAGE}>
          <img src={paymentLogoImage} alt="Logo" />
        </a>
      </div>
      <div id="paymentTitle" className={s.paymentTitle}>
        <span>{StringConstants.MEMBERSHIP_PAYMENT}</span>
      </div>
    </div>
  );
};

PaymentHeader.propTypes = {
  clubCode: PropTypes.string,
};

export default PaymentHeader;
