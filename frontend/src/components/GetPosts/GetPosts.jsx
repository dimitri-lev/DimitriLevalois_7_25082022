import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Post from './Post';

const GetPosts = ({ token }) => {
  const [postsData, setPostsData] = useState([]);

  //UseStatat new post

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPostsData(res.data));
  }, [token]);

  /* systeme de date ?, nom et prénom de l'auteur du post */
  return (
    <div>
      <ul>
        {postsData.map((article) => (
          <Post key={article._id} article={article} token={token} />
        ))}
      </ul>
    </div>
  );
};

export default GetPosts;
