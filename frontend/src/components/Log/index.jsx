import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {
  const [signUp, setSignUp] = useState(true);
  const [signIn, setSignIn] = useState(false);
  const HandleSign = (e) => {
    if (e.target.id === 'register') {
      setSignIn(false);
      setSignUp(true);
    } else if (e.target.id === 'login') {
      setSignIn(true);
      setSignUp(false);
    }
  };
  return (
    <div
      className="connection-form"
      style={{
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        height: '150px',
      }}
    >
      <div
        className="form-container"
        style={{
          display: 'flex',
          backgroundColor: '#FFD7D7',
          width: '50%',
          alignItems: 'center',
        }}
      >
        <ul>
          <li
            onClick={HandleSign}
            id="register"
            style={{ listStyleType: 'none', marginBottom: '15px' }}
          >
            S'inscrire
          </li>
          <li onClick={HandleSign} id="login" style={{ listStyleType: 'none' }}>
            Se connecter
          </li>
        </ul>
        {signUp && <SignUpForm />}
        {signIn && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
