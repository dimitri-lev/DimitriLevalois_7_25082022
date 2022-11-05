import PostContent from '../components/PostContent';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Log/Logout';
import { useEffect } from 'react';
import { useState } from 'react';

function Posts() {
  //Vérification sur le Token existe ?
  const navigate = useNavigate();
  //Si non retoruner sur la page login
  const [token, setToken] = useState(false);

  const appData = localStorage.getItem('token');

  // const token = tokenData.token;
  useEffect(() => {
    if (!appData) {
      navigate('/');
    } else {
      const appDataParse = JSON.parse(appData);

      !appDataParse.token ? navigate('/') : setToken(appDataParse.token);
    }
  }, [appData, setToken, navigate]);

  return (
    <div>
      <div>
        <Logout />
        <Logo />
      </div>
      <div>
        {token && (
          <>
            <PostContent token={token} />
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
