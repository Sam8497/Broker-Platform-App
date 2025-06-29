import React from 'react'
import { useAuth } from './contexts/AuthContext.jsx';
import { AppProvider } from './contexts/AppContext.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import BrokerLogin from './components/BrokerLogin.jsx';
import MainApp from './components/MainApp.jsx';

const App = () => {

  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
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
