import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../utils/styles/index.scss';

const NewPost = ({ token, refreshPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('image', file);
    data.append('text', content);

    axios({
      url: 'http://localhost:3000/api/posts',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then(() => {
        refreshPost(token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <form className="createPost-form" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className="createPost-textarea"
          type="text"
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <div>
          <input
            type="file"
            name="file"
            id="file"
            accept=".jpeg, .jpg, .png"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
};

export default NewPost;
