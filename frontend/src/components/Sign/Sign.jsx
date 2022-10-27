import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../../utils/styles/Sign.css';

const Sign = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const handleSign = (e) => {
    e.preventDefault();
    if (e.target.id === 'register') {
      setSignIn(false);
      setSignUp(true);
    } /* if (e.target.id === 'login') */ else {
      setSignIn(true);
      setSignUp(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        {/* <ul>
          <li>
            <button
              className="btn-log"
              onClick={handleSign}
              id="register"
              style={{ listStyleType: 'none', marginBottom: '15px' }}
            >
              S'inscrire
            </button>
          </li>
          <li>
            <button
              className="btn-log"
              onClick={handleSign}
              id="login"
              style={{ listStyleType: 'none' }}
            >
              Se connecter
            </button>
          </li>
        </ul> */}
        {signUp && <SignUp />}
        {signIn && <SignIn />}
      </div>

      {signIn ? (
        <p>
          Vous n'avez pas de compte<span> </span>
          <a href="signup" id="register" onClick={handleSign}>
            inscription
          </a>
        </p>
      ) : (
        <p>
          Vous avez un compte<span> </span>
          <a href="signup" onClick={handleSign}>
            connexion
          </a>
        </p>
      )}
    </div>
  );
};

export default Sign;
