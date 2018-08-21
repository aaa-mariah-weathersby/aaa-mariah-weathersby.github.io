import React from 'react';
import LayoutSingle from './layoutSingle'
import LayoutSidebar from './layoutSidebar'
import PropTypes from 'prop-types';


const LayoutWrapper = (Component) => (props) => (
        <div>
            <Component />
        </div>
)



// const wrapHOC = (WrappedComponent) => (props) => (
//     <div>
//       <div>header</div>
//       <div><WrappedComponent {...props}/></div>
//       <div>footer</div>
//     </div>
//   )
  
//   const App = () => <div>Hello</div>;
  
//   const WrappedApp = wrapHOC(App);

// LayoutWrapper.propTypes = {
//     content: PropTypes.object.isRequired,
//     contentProps: PropTypes.object.isRequired
// };

export default LayoutWrapper;
