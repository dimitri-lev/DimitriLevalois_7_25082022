import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ marginLeft: '100px' }}>
      <div>
        <div>S'inscrire</div>
      </div>

      <form action="" onSubmit={handleLogin}>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            name="fistName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <input type="submit" value="S'inscrire" />
      </form>
    </div>
  );
};

export default SignUpForm;
