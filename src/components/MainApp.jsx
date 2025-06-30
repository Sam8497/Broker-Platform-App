import { useApp } from '../contexts/AppContext';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import Holdings from './Holdings';
import Orderbook from './Orderbook';
import Positions from './Positions';
import OrderPad from './OrderPad';
import FloatingActionButton from './FloatingActionButton';

const MainApp = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'holdings':
        return <Holdings />;
      case 'orderbook':
        return <Orderbook />;
      case 'positions':
        return <Positions />;
      default:
        return <Holdings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-0">
        {renderScreen()}
      </main>
      <BottomNavigation />
      <OrderPad />
      <FloatingActionButton />
    </div>
  );
};

export default MainApp;