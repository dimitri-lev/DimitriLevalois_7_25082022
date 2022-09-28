import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Post from './Post';

const GetPosts = () => {
  const [postsData, setPostsData] = useState([]);
  const getData = () => {
    axios
      .get('http://localhost:3000/api/posts', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzE5ZTg0ZTJhNWI4MGY2NGJmNDVjYmEiLCJpYXQiOjE2NjQzNTIyMTgsImV4cCI6MTY2NDQzODYxOH0.ukdiV1Wyt9YgjE3cze_Cj1tV_248dYkGeaQYfvrZccM',
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
