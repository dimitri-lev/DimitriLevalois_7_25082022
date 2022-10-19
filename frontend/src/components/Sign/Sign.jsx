import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../../utils/styles/Sign.css';

const Sign = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
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
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li>
            <button
              className="btn-log"
              onClick={HandleSign}
              id="register"
              style={{ listStyleType: 'none', marginBottom: '15px' }}
            >
              S'inscrire
            </button>
          </li>
          <li>
            <button
              className="btn-log"
              onClick={HandleSign}
              id="login"
              style={{ listStyleType: 'none' }}
            >
              Se connecter
            </button>
          </li>
        </ul>
        {signUp && <SignUp />}
        {signIn && <SignIn />}
      </div>
    </div>
  );
};

export default Sign;
