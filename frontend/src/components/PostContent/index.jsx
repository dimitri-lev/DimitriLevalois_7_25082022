import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CardPost from './CardPost';
import NewPost from './NewPost';
import '../../utils/styles/index.scss';

const PostContent = ({ token }) => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    refreshPost(token);
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
      <NewPost token={token} refreshPost={refreshPost} />
      <ul className="getPosts-container">
        {postsData.map((article) => (
          <CardPost
            key={article._id}
            article={article}
            token={token}
            refreshPost={refreshPost}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostContent;
