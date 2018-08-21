import React, { PropTypes } from 'react';
import MemberIcon from '../../assets/images/MemberIcon.svg';
import { convertCentsToCurrency } from '../../utils/stringFormatter';
import { StringConstants } from '../../constants';

const paymentSummaryItem = ({ itemTitle, itemAmount, itemType }) => {
  let className;
  switch (itemType) {
    case 'Discount':
      className = 'paymentSummaryItem discount';
      break;
    case 'Person':
    case StringConstants.ADDITIONAL_MEMBERS_HEADER_TYPE:
      className = 'paymentSummaryItem person';
      break;
    default:
      className = 'paymentSummaryItem';
      break;
  }
  return (
    <div id="paymentSummaryItem" className={className}>
      <span id="summaryItemTitle" className="summaryItemTitle">
        {itemType === 'Person' && <img className="memberIcon" alt="member-icon-img" src={MemberIcon} />}
        {itemTitle}
      </span>
      {itemType !== StringConstants.ADDITIONAL_MEMBERS_HEADER_TYPE && <span id="summaryItemAmount" className="summaryItemAmount">
        {itemType === 'Discount' && '-'}
        {convertCentsToCurrency(itemAmount)}
      </span>}
    </div>
  );
};

paymentSummaryItem.propTypes = {
  itemTitle: PropTypes.string,
  itemAmount: PropTypes.number,
  itemType: PropTypes.string,
};


export default paymentSummaryItem;
