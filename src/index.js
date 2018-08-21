import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/app/App';

import store from './store/index'
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import "typeface-roboto";

/* -- lock portriat mode --*/

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById("root")
);
   
registerServiceWorker();
