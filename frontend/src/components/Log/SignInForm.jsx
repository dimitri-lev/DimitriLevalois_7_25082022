import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('false');

  function onClickSuccess() {
    if (success === true) {
      return navigate('/posts');
    } else {
      return navigate('/');
    }
  }

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/auth/login',
      /* withCredentials: true, */
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        // Enregistrer en localStorage (Token , User ID , UserAdmin)
        localStorage.setItem('token', res.data.token);
        // Redirection vers les post

        setSuccess(true);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ marginLeft: '100px' }}>
      <div>
        <div>Se connecter</div>
      </div>
      <form action="" onSubmit={handleLogin}>
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
        <input type="submit" value="Se connecter" onClick={onClickSuccess} />
      </form>
    </div>
  );
};

export default SignInForm;
