import React, { useState } from 'react';
import axios from 'axios';
import '../utils/styles/index.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPasswordError = document.querySelector('.emailPassword.error');

    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/signup',
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    })
      .then(() => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error) {
          emailPasswordError.innerHTML = 'Compte déjà utilisé';
        } else {
          emailPasswordError.innerHTML = err.response.data.message;
        }
      });
  };

  return (
    <div className="sign-component">
      <form className="sign-container" action="" onSubmit={handleLogin}>
        <div>
          <input
            className="sign-input"
            type="text"
            name="fistName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Prénom"
            aria-label="Saissisez votre prénom"
            required
          />
        </div>
        <div>
          <input
            className="sign-input"
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Nom"
            aria-label="Saissisez votre nom"
            required
          />
        </div>
        <div>
          <input
            className="sign-input"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            aria-label="Saissisez votre email"
            required
          />
        </div>
        <div>
          <input
            className="sign-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
            aria-label="Saissisez votre mot de passe"
            required
          />
        </div>
        <input className="input-valider" type="submit" value="Valider" />
        <div className="emailPassword error"></div>
      </form>
    </div>
  );
};

export default SignUp;
