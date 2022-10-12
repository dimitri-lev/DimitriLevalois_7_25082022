import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import FormData from 'form-data';

const CreatePost = ({ token }) => {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  let data = new FormData();
  data.append('File', imgUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/posts',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: {
        text: content,
        imageUrl: FormData,
        /* date: Date.now(), */
      },
    });
    setContent('');
    setImgUrl('');
    window.location.reload();
  };

  const handleFile = (e) => {
    setImgUrl(e.target.file[0]);
    setIsFileSelected(true);
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
          id="image-input"
          accept="image/jpeg, image/png, image/jpg"
          onChange={() => handleFile()}
          value={imgUrl}
        />
        {isFileSelected ? (
          <div>
            <p>Filename: {imgUrl.name}</p>

            <p>Filetype: {imgUrl.type}</p>

            <p>Size in bytes: {imgUrl.size}</p>

            <p>
              lastModifiedDate: {imgUrl.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
};

export default CreatePost;
