import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../utils/styles/index.scss';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPasswordError = document.querySelector('.emailPassword.error');

    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        let dataLocalStorage = {
          token: res.data.token,
          userId: res.data.userId,
          isAdmin: res.data.isAdmin,
        };

        localStorage.setItem('token', JSON.stringify(dataLocalStorage));
        navigate('/posts');
      })
      .catch((err) => {
        emailPasswordError.innerHTML = 'Email ou mot de passe incorrect';
        console.log(err);
      });
  };

  return (
    <div className="signIn-container">
      <form className="signIn-form" action="" onSubmit={handleLogin}>
        <div>
          <input
            className="signIn-input"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            className="signIn-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
            required
          />
        </div>
        <input className="input-valider" type="submit" value="Valider" />
        <div className="emailPassword error"></div>
      </form>
    </div>
  );
};

export default SignIn;
