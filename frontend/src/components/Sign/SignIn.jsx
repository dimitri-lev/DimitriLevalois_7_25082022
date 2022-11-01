import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../utils/styles/Sign.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const [success, setSuccess] = useState('false'); */

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // Enregistrer en localStorage (Token , User ID , UserAdmin)

        let dataLocalStorage = {
          token: res.data.token,
          userId: res.data.userId,
          isAdmin: res.data.isAdmin,
        };

        localStorage.setItem('token', JSON.stringify(dataLocalStorage));
        // Redirection vers les post
        navigate('/posts');

        // setSuccess(true);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="signIn-container">
      <form className="signIn-form" action="" onSubmit={handleLogin}>
        <div>
          {/* <label className="label-email" htmlFor="email">
            Email
          </label> */}
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div>
          {/* <label className="label-password" htmlFor="password">
            Password
          </label> */}
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Mot de passe"
          />
        </div>
        {/* <input
          type="submit"
          value="Se connecter"
          onClick={() =>
            success === true ? navigate('/posts') : navigate('/')
          }
        /> */}
        <input className="input-valider" type="submit" value="Valider" />
      </form>
    </div>
  );
};

export default SignIn;
