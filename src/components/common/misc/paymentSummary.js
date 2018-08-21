import React, { Component, PropTypes } from 'react';
import CardHeader from './cardHeader';
import PaymentSummaryItem from './paymentSummaryItem';
import s from '../../styles/core.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { StringConstants } from '../../constants';
import { convertCentsToCurrency } from '../../utils/stringFormatter';

class paymentSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desktopMobileState: true,
    };
    this.toggleDesktopMobileState = this.toggleDesktopMobileState.bind(this);
  }

  toggleDesktopMobileState() {
    this.setState({
      desktopMobileState: !this.state.desktopMobileState,
    });
  }

  render() {
    const priceCart = this.props.paymentSummaryData.PriceCart;
    const paymentSummaryComponent = [];
    const additionalMembersComponent = [];
    const discountSummaryComponent = [];
    let additionalMembersCounter = 0;

    priceCart.CartItems.forEach((summaryItem, pi) => {
      summaryItem.CartLineItems.forEach((item, ii) => {
        let AmountInCents = item.AmountInCents;
        let LineItemType = item.LineItemType;

        if (LineItemType === 'Person') {
          if (additionalMembersCounter === 0) {
            additionalMembersComponent.push(<PaymentSummaryItem
              key={`${pi * 10 + ii}additionalMembersHeader`}
              itemTitle={StringConstants.ADDITIONAL_MEMBERS_HEADER}
              itemAmount={0}
              itemType={StringConstants.ADDITIONAL_MEMBERS_HEADER_TYPE}
            />);
            additionalMembersCounter = additionalMembersCounter + 1;
          }
          additionalMembersComponent.push(<PaymentSummaryItem
            key={pi * 10 + ii}
            itemTitle={item.DisplayText}
            itemAmount={AmountInCents}
            itemType={LineItemType}
          />);
        } else if (LineItemType === 'Generic' && AmountInCents < 0) {
          LineItemType = 'Discount';
          AmountInCents = -1 * AmountInCents;
          discountSummaryComponent.push(<PaymentSummaryItem
            key={pi * 10 + ii}
            itemTitle={item.DisplayText}
            itemAmount={AmountInCents}
            itemType={LineItemType}
          />);
        } else if (LineItemType === 'Discount') {
          discountSummaryComponent.push(<PaymentSummaryItem
            key={pi * 10 + ii}
            itemTitle={item.DisplayText}
            itemAmount={AmountInCents}
            itemType={LineItemType}
          />);
        } else {
          paymentSummaryComponent.push(<PaymentSummaryItem
            key={pi * 10 + ii}
            itemTitle={item.DisplayText}
            itemAmount={AmountInCents}
            itemType={LineItemType}
          />);
        }
      });
    });

    const paymentSummaryClass = this.state.desktopMobileState ? 'paymentSummary desktopMobileState' : 'paymentSummary';

    let additionalInfoMessageClass;
    if (this.props.additionalInfoMessage) {
      additionalInfoMessageClass = s.additionalInfoMessage;
    } else {
      additionalInfoMessageClass = s.additionalInfoNoMessage;
    }

    return (
      <div id="paymentSummarySection" className={`${s.card} ${s.paymentSummaryContainer}`}>
        <div className={paymentSummaryClass}>
          <CardHeader
            id="payment_summary"
            header={StringConstants.PAYMENT_SUMMARY_HEADER}
            collapsable={true}
            toggleSummarySection={this.toggleDesktopMobileState}
            isCollapsed={this.state.desktopMobileState}
          />
          <ReactCSSTransitionGroup
            transitionName="expandSummary"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div className="paymentSummaryBody">
              <div className={additionalInfoMessageClass}>
                <span className={s.additionalInfoMessageText}>
                  {this.props.additionalInfoMessage}
                </span>
              </div>
              {paymentSummaryComponent}
              {additionalMembersComponent.length > 0 && <div>{additionalMembersComponent}</div>}
              {discountSummaryComponent.length > 0 && <div><div className="discountSummaryDividerBody" /> <div>{discountSummaryComponent}</div></div>}
            </div>
          </ReactCSSTransitionGroup>
          <div id="totalSummaryAmount" className={s.totalSummaryAmount}>
            <span id="totalAmountTitle">{StringConstants.TOTAL_AMOUNT}</span>
            <span id="totalAmount" className={s.totalAmount}>{convertCentsToCurrency(priceCart.GrandTotalInCents)}</span>
          </div>
        </div>
      </div>
    );
  }
}

paymentSummary.propTypes = {
  paymentSummaryData: PropTypes.shape({
    PriceCart: PropTypes.shape({
      CartItems: PropTypes.array.isRequired,
      GrandTotalInCents: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  additionalInfoMessage: PropTypes.string,
};

export default paymentSummary;
