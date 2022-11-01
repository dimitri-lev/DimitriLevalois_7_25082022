import GetPosts from '../components/GetPosts/GetPosts';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost/CreatePost';
import Logout from '../components/Logout';
import { useEffect } from 'react';
import { useState } from 'react';

function Posts() {
  //Vérification sur le Token existe ?
  const navigate = useNavigate();
  //Si non retoruner sur la page login
  const [token, setToken] = useState(false);

  //axion get allPost (headers : autorization TOKEN)
  //Si ok -> afficher le post
  //Catch -> redirection login/404

  //HTML afficher tous les posts via composant post (image, text, j'aime)

  // const tokenData = JSON.parse(localStorage.getItem('token'));
  const appData = localStorage.getItem('token');

  // const token = tokenData.token;
  useEffect(() => {
    console.log(appData);
    if (!appData) {
      navigate('/');
    } else {
      const appDataParse = JSON.parse(appData);

      !appDataParse.token ? navigate('/') : setToken(appDataParse.token);
    }
  }, [appData, setToken, navigate]);

  //   //  else {
  //   //   if (tokenData.token) {
  //   //     setToken(tokenData.token);
  //   //   }
  //   // }

  //UseStat newpost false

  return (
    <div>
      <div>
        <Logout />
        <Logo />
      </div>
      <div>
        {token && (
          <>
            <CreatePost token={token} />
            <GetPosts token={token} />
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
