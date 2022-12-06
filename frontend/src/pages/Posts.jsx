import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import { useEffect } from 'react';
import { useState } from 'react';
import CardPost from '../components/CardPost';
import NewPost from '../components/NewPost';
import axios from 'axios';
import '../utils/styles/index.scss';

function Posts() {
  const navigate = useNavigate();

  const [token, setToken] = useState(false);
  const [postsData, setPostsData] = useState([]);

  const appData = localStorage.getItem('token');

  useEffect(() => {
    if (!appData) {
      navigate('/');
    } else {
      const appDataParse = JSON.parse(appData);

      !appDataParse.token ? navigate('/') : setToken(appDataParse.token);
    }
  }, [appData, setToken, navigate]);

  useEffect(() => {
    if (token) {
      refreshPost(token);
    }
  }, [token]);

  const refreshPost = (token) => {
    axios
      .get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPostsData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <Logout />
        <Logo />
      </div>
      <div>
        {token && (
          <div className="post-component">
            <NewPost token={token} refreshPost={refreshPost} />
            {postsData.length === 0 ? (
              <div className="post-error">Il n'y a pas encore de post 🙈</div>
            ) : (
              <ul className="post-container">
                {postsData.map((post) => (
                  <CardPost
                    key={post._id}
                    post={post}
                    token={token}
                    refreshPost={refreshPost}
                  />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
