import React, { PropTypes } from 'react';
import s from '../../styles/core.scss';
import TabSelector from './tabSelector';
import arrowDropImg from '../../assets/images/arrowDown.svg';
import arrowUpImg from '../../assets/images/arrowUp.svg';

const cardHeader = ({ header, subheader, tabs, highlight, id, collapsable, toggleSummarySection, isCollapsed }) => {
  // isCollapsed is true if it is collapsed and is in mobile mode, or if it is expanded in desktop mode. It is false if it is expanded and
  // is in mobile mode, or if it is collapsed in desktop mode. It is inverted between desktop and mobile to allow the mobile mode to default
  // to closed, while the desktop version defaults to being open.
  const collapseIcon = isCollapsed ? 'collapsibleArrowImg downArrow' : 'collapsibleArrowImg upArrow';
  return (
    <div className="cardHeader">
      <a id={`anchor_${id}`} />
      <div id={id} className={highlight ? `${s.highlight} ${s.cardTitle}` : s.cardTitle}>
        <span className="boldSubtitle">{header}</span>
        {collapsable &&
          <img className={collapseIcon} alt="collapsable-arrow-img" onClick={toggleSummarySection} src={isCollapsed ? arrowDropImg : arrowUpImg} />
        }
      </div>
      {subheader && <div id="subheader" className={'cardSubTitle'} >{subheader}</div>}
      {tabs && <TabSelector tabs={tabs} />}
    </div>
  );
};

cardHeader.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string,
  tabs: PropTypes.array,
  highlight: PropTypes.bool,
  id: PropTypes.string,
  collapsable: PropTypes.bool,
  toggleSummarySection: PropTypes.func,
  isCollapsed: PropTypes.bool,
};

export default cardHeader;
