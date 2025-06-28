import React from 'react'
import { useAuth } from './contexts/AuthContext.jsx';
import { AppProvider } from './contexts/AppContext.jsx';
import BrokerLogin from './components/BrokerLogin.jsx';
import MainApp from './components/MainApp.jsx';

const App = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        loading...
      </div>
    );
  }

  if (!user) {
    return <BrokerLogin />;
  }

  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  )
}

export default App
