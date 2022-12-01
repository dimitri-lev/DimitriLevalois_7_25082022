import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import '../utils/styles/index.scss';
import { useEffect } from 'react';

const CardPost = ({ post, token, refreshPost }) => {
  const tokenData = JSON.parse(localStorage.getItem('token'));

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [file, setFile] = useState(null);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post.usersLiked.includes(tokenData.userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [setLiked, post, tokenData]);

  const dateFormater = (date) => {
    let newDate = new Date(date).toLocaleDateString('FR-fr', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    return newDate;
  };

  const handleEdit = () => {
    let data = new FormData();

    data.append('image', file);
    data.append('text', editContent ? editContent : post.text);

    axios({
      method: 'PUT',
      url: 'http://localhost:3000/api/posts/' + post._id,
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
      url: 'http://localhost:3000/api/posts/' + post._id,
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
    const postId = post._id;
    axios({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${postId}/like`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        refreshPost(token);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="post-card">
      <div className="post-card-top">
        <p className="post-card-name">
          {post.userId.firstName} {post.userId.lastName}
        </p>
        <p className="post-card-date">{dateFormater(post.date)}</p>
      </div>

      <div className="post-card-middle">
        {isEditing ? (
          <textarea
            className="post-card-textarea"
            defaultValue={editContent ? editContent : post.text}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="post-card-content">
            {editContent ? editContent : post.text}
          </p>
        )}
        <a className="post-card-anchor" href={post.imageUrl}>
          <img src={post.imageUrl} alt="post img" className="post-card-img" />
        </a>
      </div>

      <div className="post-card-down">
        <span className="post-card-heart">
          <span>
            {!liked ? (
              <FontAwesomeIcon
                className="post-card-unlike"
                icon={farFaHeart}
                onClick={() => handleLike()}
                aria-label="like"
              />
            ) : (
              <FontAwesomeIcon
                className="post-card-like"
                icon={fasFaHeart}
                onClick={() => handleLike()}
                aria-label="dislike"
              />
            )}
          </span>
          <span className="post-cart-like">{post.likes}</span>
        </span>

        {post.userId._id === tokenData.userId || tokenData.isAdmin ? (
          <div className="post-card-btn">
            {isEditing ? (
              <div>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept=".jpeg, .jpg, .png"
                  aria-label="choissisez un fichier image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  className="post-card-btn-valider"
                  onClick={() => handleEdit()}
                >
                  Valider
                </button>
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
              aria-label="supprimer"
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
