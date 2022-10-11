import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const CreatePost = ({ token }) => {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/posts',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: content,
        /* imageUrl: imgUrl, */
        /* date: Date.now(), */
      },
    });
    setContent('');
    setImgUrl('');
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          type="text"
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <input
          type="text"
          onChange={(e) => setImgUrl(e.target.files[0])}
          value={imgUrl}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CreatePost;
