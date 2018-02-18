import React from 'react';

import '../styles/components/header.css';
import logo from '../assets/logo.svg';

function Header(props) {
    return (
        <div className="App">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
        </header>
      </div>
      );
}

export default Header;