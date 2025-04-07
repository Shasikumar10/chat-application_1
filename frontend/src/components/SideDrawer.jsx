// src/components/SideDrawer.jsx
import React from 'react';

const SideDrawer = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className="d-flex justify-content-between align-items-center p-3 bg-light border rounded">
      <h4>Chat App</h4>
      <span>Welcome, {user?.name}</span>
    </div>
  );
};

export default SideDrawer;
