import React from 'react';
import { useState } from 'react';

const CreatePost = ({ token }) => {
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
        console.log('Success:', result);
        /* setFile(''); */
        window.location.reload();
      })

      .catch((error) => {
        console.error('Error:', error);
      });
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
      </form>
    </div>
  );
};

export default CreatePost;
