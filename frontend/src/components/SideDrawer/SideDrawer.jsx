import React from 'react';
import { useAuth } from '../../context/ChatProvider';

const SideDrawer = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '10px', background: '#eee', width: '250px' }}>
      <h3>Welcome, {user?.name}</h3>
    </div>
  );
};

export default SideDrawer;
