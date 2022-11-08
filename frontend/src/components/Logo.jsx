import React from 'react';
import logo from '../assets/icon-left-font.png';
import '../utils/styles/index.scss';

const Logo = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo groupomania" className="app-logo" />
    </div>
  );
};

export default Logo;
