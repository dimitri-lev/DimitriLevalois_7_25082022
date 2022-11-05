import React, { useState } from 'react';
import axios from 'axios';
import '../../utils/styles/Sign.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/signup',
      /* withCredentials: true, */
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    })
      .then((res) => {
        window.location = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signUp-container">
      <form className="signUp-form" action="" onSubmit={handleLogin}>
        <div>
          {/* <label htmlFor="firstName">Prénom</label> */}
          <input
            className="signUp-input"
            type="text"
            name="fistName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Prénom"
          />
        </div>
        <div>
          {/* <label htmlFor="lastName">Nom</label> */}
          <input
            className="signUp-input"
            type="text"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Nom"
          />
        </div>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            className="signUp-input"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="signUp-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
          />
        </div>
        <input className="input-valider" type="submit" value="Valider" />
      </form>
    </div>
  );
};

export default SignUp;
