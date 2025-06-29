import { useState, useEffect } from 'react';
import { fetchPositions } from '../services/mockApi';
import { useApp } from '../contexts/AppContext';
import LoadingSpinner from './LoadingSpinner';

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openOrderPad } = useApp();

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const data = await fetchPositions();
        setPositions(data);
      } catch (error) {
        console.error('Error loading positions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPositions();
  }, []);

  const totalPnl = positions.reduce((sum, position) => sum + position.pnl, 0);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Positions P&L</h2>
        <div className="text-center">
          <p className={`text-3xl font-bold ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString()}
          </p>
          <p className="text-gray-500 text-sm mt-1">Total unrealized P&L</p>
        </div>
      </div>

      <div className="space-y-3">
        {positions.map((position) => (
          <div
            key={position.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => openOrderPad(position, 'sell')}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <h3 className="font-bold text-gray-800">{position.symbol}</h3>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  position.type === 'CE' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {position.type}
                </div>
              </div>
              <div className={`text-right ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <p className="font-bold">
                  {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toLocaleString()}
                </p>
                <p className="text-sm">
                  ({position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
              <div>
                <p className="text-xs">Strike</p>
                <p className="font-medium text-gray-800">₹{position.strike}</p>
              </div>
              <div>
                <p className="text-xs">Quantity</p>
                <p className="font-medium text-gray-800">{position.quantity}</p>
              </div>
              <div>
                <p className="text-xs">Avg Price</p>
                <p className="font-medium text-gray-800">₹{position.avgPrice}</p>
              </div>
              <div>
                <p className="text-xs">LTP</p>
                <p className="font-medium text-gray-800">₹{position.ltp}</p>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Expiry: {position.expiry}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;