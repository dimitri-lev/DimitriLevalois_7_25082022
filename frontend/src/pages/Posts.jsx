import PostContent from '../components/PostContent';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Log/Logout';
import { useEffect } from 'react';
import { useState } from 'react';

function Posts() {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);

  const appData = localStorage.getItem('token');

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
