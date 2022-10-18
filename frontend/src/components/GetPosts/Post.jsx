import React from 'react';
import '../../utils/styles/GetPosts.css';
import { useState } from 'react';
import axios from 'axios';

const Post = ({ article, token }) => {
  console.log(article);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

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
    axios({
      method: 'PUT',
      url: 'http://localhost:3000/api/posts/' + article._id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        text: editContent ? editContent : article.text,
      },
    }).then(() => setIsEditing(false));
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
          {article.likes}
        </p>
        {isEditing ? (
          <button
            onClick={() => handleEdit()}
            style={{ position: 'absolute', right: '100px', bottom: '10px' }}
          >
            Valider
          </button>
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
