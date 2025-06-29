import { useApp } from '../contexts/AppContext';

const BottomNavigation = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems = [
    { id: 'holdings', label: 'Holdings', icon: '📊' },
    { id: 'orderbook', label: 'Orders', icon: '📋' },
    { id: 'positions', label: 'Positions', icon: '⚡' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              currentScreen === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;