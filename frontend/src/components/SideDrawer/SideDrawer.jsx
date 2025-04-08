import React from 'react';
import { useAuth } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ width: '25%', backgroundColor: '#f1f1f1', padding: '20px' }}>
      <h2>User Panel</h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SideDrawer;
