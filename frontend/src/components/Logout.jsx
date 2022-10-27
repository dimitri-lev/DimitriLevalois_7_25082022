import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
        style={{ fontSize: '24px' }}
        icon={faArrowRight}
        onClick={() => handleLogout()}
      />
    </div>
  );
};

export default Logout;
