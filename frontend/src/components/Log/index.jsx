import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import '../../utils/styles/index.scss';

const Log = () => {
  const [signUp, setSignUp] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const handleSign = (e) => {
    e.preventDefault();

    if (e.target.id === 'register') {
      setSignIn(false);
      setSignUp(true);
    } else {
      setSignIn(true);
      setSignUp(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        {signUp && <SignUp />}
        {signIn && <SignIn />}
      </div>

      {signIn ? (
        <p>
          Vous n'avez pas de compte ?&nbsp;
          <a href="signup" id="register" onClick={handleSign}>
            inscription
          </a>
        </p>
      ) : (
        <p>
          Vous avez un compte ?&nbsp;
          <a href="signup" id="connect" onClick={handleSign}>
            connexion
          </a>
        </p>
      )}
    </div>
  );
};

export default Log;
