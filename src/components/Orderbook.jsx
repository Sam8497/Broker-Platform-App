import { useState, useEffect } from 'react';
import { fetchOrderbook } from '../services/mockApi';
import LoadingSpinner from './LoadingSpinner';

const Orderbook = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderbook = async () => {
      try {
        const data = await fetchOrderbook();
        setOrders(data);
      } catch (error) {
        console.error('Error loading orderbook:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderbook();
  }, []);

  const realizedPnl = orders.reduce((sum, order) => sum + (order.realizedPnl || 0), 0);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 pb-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">P&L Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-green-600 text-sm font-medium">Realized P&L</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{realizedPnl.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-600 text-sm font-medium">Unrealized P&L</p>
            <p className="text-2xl font-bold text-blue-700">₹2,522</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.type === 'BUY'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {order.type}
                </div>
                <h3 className="font-bold text-gray-800">{order.symbol}</h3>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.status === 'EXECUTED'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {order.status}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-medium">{order.quantity}</p>
              </div>
              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-medium">₹{order.price}</p>
              </div>
              <div>
                <p className="text-gray-500">Time</p>
                <p className="font-medium">{order.timestamp.split(' ')[1]}</p>
              </div>
            </div>
            
            {order.realizedPnl !== 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className={`text-sm font-medium ${
                  order.realizedPnl >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  Realized P&L: {order.realizedPnl >= 0 ? '+' : ''}₹{order.realizedPnl}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderbook;