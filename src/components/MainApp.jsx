import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MainApp = () => {

  const { logout } = useAuth();

  return (
    <div>
      Main App
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default MainApp
