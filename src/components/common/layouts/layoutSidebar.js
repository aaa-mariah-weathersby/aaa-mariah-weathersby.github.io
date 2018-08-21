import React from 'react';
import PropTypes from 'prop-types';

const LayoutSidebar = ({content, contentProps, sidebar, sidebarProps}) => { 
    return (
        <section>
            <div class={"primary-layout"}></div>
            <div class={"sidebar-layout"}></div>
        </section>
    )
};

LayoutSidebar.propTypes = {
    content: PropTypes.object.isRequired,
    contentProps: PropTypes.object.isRequired,
    sidebar: PropTypes.object.isRequired,
    sidebarProps: PropTypes.object.isRequired
};

export default LayoutSidebar;