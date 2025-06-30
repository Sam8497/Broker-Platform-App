import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { brokers } from '../services/mockApi';

const BrokerLogin = () => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleBrokerSelect = (broker) => {
    setSelectedBroker(broker);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login({ email, password }, selectedBroker);
    if (!result.success) {
      setError(result.error);
    }
  };

  const goBack = () => {
    setSelectedBroker(null);
    setError('');
    setEmail('');
    setPassword('');
  };

  if (selectedBroker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button 
            onClick={goBack}
            className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
          >
            ← Back to brokers
          </button>
          
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{selectedBroker.logo}</div>
            <h2 className="text-2xl font-bold text-gray-800">Login to {selectedBroker.name}</h2>
            <p className="text-gray-600 mt-2">{selectedBroker.description}</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleLogin}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Demo credentials: any email/password
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Broker</h1>
          <p className="text-xl text-gray-600">Select from top Indian brokers to start trading</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brokers.map((broker) => (
            <div
              key={broker.id}
              onClick={() => handleBrokerSelect(broker)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{broker.logo}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{broker.name}</h3>
                <p className="text-gray-600 mb-4">{broker.description}</p>
                <div 
                  className="w-full py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: broker.color }}
                >
                  Login
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokerLogin;