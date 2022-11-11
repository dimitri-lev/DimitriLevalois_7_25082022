import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../utils/styles/index.scss';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    localStorage.clear();
  };

  return (
    <div className="logout">
      <FontAwesomeIcon
        className="logout-icon"
        icon={faSignOut}
        onClick={() => handleLogout()}
      />
    </div>
  );
};

export default Logout;
