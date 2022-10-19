import React from 'react';
import '../../utils/styles/GetPosts.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = ({ article, token }) => {
  console.log(article);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString('FR-fr', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    return newDate;
  };

  const handleEdit = () => {
    setContent(content);
    let data = new FormData();
    data.append('image', file);
    data.append('text', content);

    console.log(data);

    /* axios({
      method: 'PUT',
      url: 'http://localhost:3000/api/posts/' + article._id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: editContent ? editContent : article.text,
      },
    }).then(() => setIsEditing(false)); */
    fetch(
      'http://localhost:3000/api/posts/' + article._id,

      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }
    )
      .then((response) => response.json())

      .then((result) => {
        setIsEditing(false);
        console.log('Success:', result);
        /* setFile(''); */
      })

      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDelete = () => {
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/posts/' + article._id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  };

  const handleLike = () => {
    const articleId = article._id;
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${articleId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        like: 1,
      },
    });
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <textarea
          defaultValue={editContent ? editContent : article.text}
          onChange={(e) => setEditContent(e.target.value)}
        ></textarea>
      ) : (
        <p style={{ marginLeft: '20px' }}>
          {editContent ? editContent : article.text}
        </p>
      )}
      <p>
        {article.userId.firstName} {article.userId.lastName}
      </p>
      <p>{dateFormater(article.date)}</p>
      <img src={article.imageUrl} alt="" className="post-img" />

      <div>
        <p style={{ position: 'absolute', right: '160px', bottom: '0px' }}>
          <FontAwesomeIcon icon={faHeart} onClick={() => handleLike()} />{' '}
          {article.likes}
        </p>
        {isEditing ? (
          <div>
            <button
              onClick={() => handleEdit()}
              style={{ position: 'absolute', right: '100px', bottom: '10px' }}
            >
              Valider
            </button>
            <input
              type="file"
              name="file"
              id="file"
              accept=".jpeg, .jpg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{ position: 'absolute', right: '100px', bottom: '10px' }}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => {
            if (window.confirm('Voulez-vous vraiment supprimer ce Post')) {
              handleDelete();
            }
          }}
          style={{ position: 'absolute', right: '10px', bottom: '10px' }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Post;
