import React from 'react';
import '../../utils/styles/GetPosts.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Post = ({ article, token }) => {
  console.log(article);

  const tokenData = JSON.parse(localStorage.getItem('token'));

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
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
    let data = new FormData();
    data.append('image', file);
    data.append('text', editContent ? editContent : article.text);

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
        console.log('Success:', result);
        setIsEditing(false);
        window.location.reload();
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
    });
    window.location.reload();
  };

  return (
    <div className="post-container">
      <div className="post-name-date">
        <p className="post-name">
          {article.userId.firstName} {article.userId.lastName}
        </p>
        <p className="post-date">{dateFormater(article.date)}</p>
      </div>

      <div className="post-text-img">
        {isEditing ? (
          <textarea
            className="textarea-edit"
            defaultValue={editContent ? editContent : article.text}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p>{editContent ? editContent : article.text}</p>
        )}
        <a href={article.imageUrl}>
          <img src={article.imageUrl} alt="" className="post-img" />
        </a>
      </div>
      <div className="post-like-edit">
        <p>
          <FontAwesomeIcon icon={faHeart} onClick={() => handleLike()} />{' '}
          {article.likes}
        </p>
        {article.userId._id === tokenData.id || tokenData.isAdmin ? (
          <div className="btn-valider-img">
            {isEditing ? (
              <div>
                <button className="btn-valider" onClick={() => handleEdit()}>
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
                className="btn-modifier"
                onClick={() => setIsEditing(true)}
              >
                Modifier
              </button>
            )}

            <button
              onClick={() => {
                if (window.confirm('Voulez-vous vraiment supprimer ce Post')) {
                  handleDelete();
                }
              }}
            >
              Supprimer
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
