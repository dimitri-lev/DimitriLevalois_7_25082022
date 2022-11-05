import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };
  return (
    <div style={{ textAlign: 'end' }}>
      <FontAwesomeIcon
        style={{ fontSize: '30px', padding: '20px 20px 5px 0px' }}
        icon={faSignOut}
        onClick={() => handleLogout()}
      />
      <p style={{ margin: '0' }}>Déconnexion</p>
    </div>
  );
};

export default Logout;
