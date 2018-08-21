import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css';

import LayoutWrapper from "../common/layouts/layoutWrapper"
import Header from "../common/header/mainHeader"
import AppRoutes from '../routes/AppRoutes'
import ProgressBar from '../progressBar/ProgressBar'
import Footer from '../pricingFooter/footer'

const App = () => (

<div className={"App"}>
    <Router>
      <Route
        render={({ location }) => (
          <div className={"App-main"}>
              <div className={"header-wrapper"}>
                <Header />  
              </div>
              <ProgressBar />          

              <div className={"layout-main"}>
                <AppRoutes location={location} />            
              </div>

              <Footer 
                monthlyPrice={"$000.00"}
              />
              
            </div>
        )}
      />
    </Router>
  </div>

);



export default App;