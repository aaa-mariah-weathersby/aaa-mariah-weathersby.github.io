import React from 'react';
// import URLHelper from '../../utils/URLHelper';
// import { EndPoints, NavigationURLs } from '../../constants';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import s from './styles/mainHeader.css';

import Home from '../../home/constants'
import Contact from '../../contactInfo/constants'

import logo from '../../../images/AAA_logo/original.png'
import helpIcon from '../../../images/Help-Icon/help-chat.png'
import backIcon from '../../../images/Back-Arrow.png'

class MainHeader extends React.Component {

  gotoUrlWrapper(url) {
    return () => {

    };
  }

  render() {
    // const baseURL = `http://www.${config.clubNameURL}.aaa.com/home/`;

    return (
      <header id="header" className={s.headerContainer}>

        <div className={"header-sec left"}>
          <Link to={Home.PATH} className={"header-icon"}>
            <img className={"logo header-icon"} src={logo} />
          </Link>
          
        </div>

        <div className={"header-sec"}>
          <h3 id={"help-copy"}>Just say the word and we will help.  
              <span className={"link"}> Help Me!</span>
          </h3>
          <img id={"helper-icon"} className={"header-icon"} src={helpIcon} />
        </div>

      </header>
    );
  }
}

export default MainHeader;
