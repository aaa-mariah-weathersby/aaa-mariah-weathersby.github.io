import React from 'react';
import PropTypes from 'prop-types';

const LayoutSingle = (Component) => (props) => { 

    return (
        <section>
            <div className={"primary-layout"}>
                <Component {...props}/>
            </div>
        </section>
    )
};

LayoutSingle.propTypes = {
    content: PropTypes.object.isRequired,
    contentProps: PropTypes.object.isRequired
};

export default LayoutSingle;
