import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import '../utils/styles/index.scss';
import '../utils/styles/components/PostContent/heart.css';
import { useEffect } from 'react';

const CardPost = ({ article, token, refreshPost }) => {
  const tokenData = JSON.parse(localStorage.getItem('token'));

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [file, setFile] = useState(null);

  const [liked, setLiked] = useState(false);

  console.log(article.usersLiked);

  useEffect(() => {
    if (article.usersLiked.includes(tokenData.userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [setLiked, article, tokenData]);

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

    axios({
      method: 'PUT',
      url: 'http://localhost:3000/api/posts/' + article._id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    })
      .then(() => {
        setIsEditing(false);
        refreshPost(token);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/posts/' + article._id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        refreshPost(token);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleLike = () => {
    const articleId = article._id;
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${articleId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        refreshPost(token);
        // setLiked(true);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleUnLike = () => {
    const articleId = article._id;
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${articleId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        refreshPost(token);
        // setLiked(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="post-card">
      <div className="post-card-top">
        <p className="post-card-name">
          {article.userId.firstName} {article.userId.lastName}
        </p>
        <p className="post-card-date">{dateFormater(article.date)}</p>
      </div>

      <div className="post-card-middle">
        {isEditing ? (
          <textarea
            className="post-card-textarea"
            defaultValue={editContent ? editContent : article.text}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="post-card-article">
            {editContent ? editContent : article.text}
          </p>
        )}
        <a className="post-card-anchor" href={article.imageUrl}>
          <img src={article.imageUrl} alt="" className="post-card-img" />
        </a>
      </div>

      <div className="post-card-down">
        <span className="heart">
          <span>
            {!liked ? (
              <FontAwesomeIcon
                className="unlike"
                icon={farFaHeart}
                onClick={() => handleLike()}
              />
            ) : (
              <FontAwesomeIcon
                className="like"
                icon={fasFaHeart}
                onClick={() => handleUnLike()}
              />
            )}
          </span>
          <span className="post-cart-like">{article.likes}</span>
        </span>

        {article.userId._id === tokenData.userId || tokenData.isAdmin ? (
          <div className="post-card-btn">
            {isEditing ? (
              <div>
                <button
                  className="post-card-btn-valider"
                  onClick={() => handleEdit()}
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
                className="post-card-btn-modifier"
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

export default CardPost;
