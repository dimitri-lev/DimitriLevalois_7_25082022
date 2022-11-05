import React from 'react';
import { useState } from 'react';
import '../../utils/styles/CreatePost.css';
/* import GetPosts from '../GetPosts/GetPosts'; */

const NewPost = ({ token, refreshPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('image', file);

    data.append('text', content);

    fetch(
      'http://localhost:3000/api/posts',

      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    )
      .then((response) => response.json())

      .then((result) => {
        /* setFile(''); */
        refreshPost(token);
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <form className="form-createPost" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          className="textarea"
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
            /* value={imgUrl} */
          />
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
};

export default NewPost;
