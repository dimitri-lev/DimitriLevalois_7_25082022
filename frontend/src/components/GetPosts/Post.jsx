import React from 'react';
import '../../utils/styles/GetPosts.css';
import { useState } from 'react';

const Post = ({ article }) => {
  console.log(article);

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

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="post-container">
      {isEditing ? (
        <textarea></textarea>
      ) : (
        <p style={{ marginLeft: '20px' }}>{article.text}</p>
      )}
      <p>{dateFormater(article.date)}</p>
      <img src={article.imageUrl} alt="" className="post-img" />

      <div>
        <p style={{ position: 'absolute', right: '160px', bottom: '0px' }}>
          {article.likes}
        </p>
        <button
          onClick={() => setIsEditing(true)}
          style={{ position: 'absolute', right: '100px', bottom: '10px' }}
        >
          Edit
        </button>
        <button style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Post;
