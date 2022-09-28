import React from 'react';

const Post = ({ article }) => {
  return (
    <div
      style={{
        width: '80%',
        height: '200px',
        backgroundColor: 'orange',
        border: '2px black solid',
        marginBottom: '20px',
        position: 'relative',
      }}
    >
      <p style={{ marginLeft: '20px' }}>{article.text}</p>
      <img
        src={article.imageUrl}
        alt=""
        style={{
          width: '100px',
          position: 'absolute',
          right: '20px',
          top: '20px',
        }}
      />

      <div>
        <p style={{ position: 'absolute', right: '160px', bottom: '0px' }}>
          {article.likes}
        </p>
        <button
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
