import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Post from './Post';

const GetPosts = ({ token }) => {
  const [postsData, setPostsData] = useState([]);

  const getData = () => {
    axios
      .get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setPostsData(res.data));
  };

  useEffect(() => getData(), []);

  /* systeme de date ?, nom et prénom de l'auteur du post */
  return (
    <div>
      <ul>
        {postsData.map((article) => (
          <Post key={article._id} article={article} />
        ))}
      </ul>
    </div>
  );
};

export default GetPosts;
