import React, { PropTypes } from 'react';
import { StringConstants } from '../../constants';
import HtmlTextFormatter from '../../utils/htmlTextFormatter';
import URLHelper from '../../utils/URLHelper';

const PaymentFooter = ({ footerDisclaimer }) => {
  let copyrightText;
  let disclaimerText;
  switch (URLHelper.getCurrentPath(window.location)) {
    case 'olb':
      copyrightText = '';
      disclaimerText = footerDisclaimer || StringConstants.FOOTER_OLB_DISCLAIMER;
      break;
    case 'mpp':
      copyrightText = '';
      disclaimerText = footerDisclaimer || StringConstants.FOOTER_DISCLAIMER;
      break;
    default:
      copyrightText = StringConstants.FOOTER_COPYRIGHT.replace('{1}', (new Date(Date.now())).getFullYear());
      disclaimerText = StringConstants.FOOTER_DISCLAIMER;
      break;
  }
  return (
    <div
      className="paymentFooterContainer"
    >
      <div id="disclaimerContainer" className="disclaimerContainer">
        {copyrightText.length === 0 ? null :
          <div className="copyright">
            {HtmlTextFormatter.formatText(copyrightText)}
          </div>
        }
        <div>
          {HtmlTextFormatter.formatText(disclaimerText)}
        </div>
      </div>
    </div>
  );
};

PaymentFooter.propTypes = {
  footerDisclaimer: PropTypes.string,
};

export default PaymentFooter;
