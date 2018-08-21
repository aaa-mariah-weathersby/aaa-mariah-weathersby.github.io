import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/Helper.scss';
import helperImg from './styles/assets/fill-1@2x.png'
import cx from 'classnames';

export const Helper = ( props ) => {
    return(
        (props.active !== false)
        ?
        <div className={`helper helper-container ${cx(styles.helper_container)}`}>
            <img 
                alt={"ACE Helper"}
                src={helperImg}
                className={`helper-face helper-child ${cx(styles.helper_face)} ${cx(styles.helper_child)}`}
            />
            <div 
                className={`helper-content helper-child ${cx(styles.helper_content)} ${cx(styles.helper_child)}`}
            >
                <p>{props.content}</p>
            </div>
        </div>
        : null
    )
}

Helper.propTypes = {
    active: PropTypes.bool,
    content: PropTypes.string.isRequired,
};

export default Helper;