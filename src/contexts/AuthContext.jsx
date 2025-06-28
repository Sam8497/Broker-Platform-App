import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBroker, setSelectedBroker] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const storedBroker = localStorage.getItem('selectedBroker');
    if (storedUser && storedBroker) {
      setUser(JSON.parse(storedUser));
      setSelectedBroker(JSON.parse(storedBroker));
    }
    setLoading(false);
  }, []);

  const login = async (credentials, broker) => {
    try {
      setLoading(true);
      
      // Simulate API call with random response
      const responses = [
        { status: 200, data: { id: 1, email: credentials.email, name: 'John Doe' } },
        { status: 400, error: 'Invalid credentials' },
        { status: 500, error: 'Server error. Please try again later.' }
      ];
      
      // For demo, make it more likely to succeed
      const randomResponse = Math.random() < 0.7 ? responses[0] : responses[Math.floor(Math.random() * 3)];
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      if (randomResponse.status === 200) {
        const userData = randomResponse.data;
        setUser(userData);
        setSelectedBroker(broker);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('selectedBroker', JSON.stringify(broker));
        return { success: true };
      } else {
        return { success: false, error: randomResponse.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setSelectedBroker(null);
    localStorage.removeItem('user');
    localStorage.removeItem('selectedBroker');
  };

  const value = {
    user,
    selectedBroker,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};