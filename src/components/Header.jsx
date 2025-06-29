import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, selectedBroker, logout } = useAuth();

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{selectedBroker?.logo}</div>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{selectedBroker?.name}</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;