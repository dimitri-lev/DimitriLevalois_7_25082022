import React from 'react';
import logo from '../assets/icon-left-font.png';
import '../utils/styles/index.scss';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="logo groupomania" className="logo-img" />
    </div>
  );
};

export default Logo;
