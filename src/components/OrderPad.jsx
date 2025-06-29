import { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const OrderPad = () => {
  const { orderPadOpen, closeOrderPad, selectedStock, orderType } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(selectedStock?.currentPrice || selectedStock?.ltp || 0);
  const [orderTypeLocal, setOrderTypeLocal] = useState('MARKET');

  if (!orderPadOpen || !selectedStock) return null;

  const isBuy = orderType === 'buy';
  const totalValue = quantity * price;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the order to the API
    alert(`${orderType.toUpperCase()} order placed for ${quantity} shares of ${selectedStock.symbol}`);
    closeOrderPad();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className={`w-full bg-white rounded-t-3xl p-6 transform transition-transform duration-300 ${
        isBuy ? 'border-t-4 border-green-500' : 'border-t-4 border-red-500'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${isBuy ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-bold">
              {isBuy ? 'Buy' : 'Sell'} {selectedStock.symbol}
            </h2>
          </div>
          <button
            onClick={closeOrderPad}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">{selectedStock.name}</p>
          <p className="text-2xl font-bold">
            ₹{selectedStock.currentPrice || selectedStock.ltp}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setOrderTypeLocal('MARKET')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                orderTypeLocal === 'MARKET'
                  ? isBuy ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-gray-100 text-gray-700'
              } border`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderTypeLocal('LIMIT')}
              className={`py-3 rounded-lg font-medium transition-colors ${
                orderTypeLocal === 'LIMIT'
                  ? isBuy ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-gray-100 text-gray-700'
              } border`}
            >
              Limit
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {orderTypeLocal === 'LIMIT' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Value:</span>
              <span className="text-xl font-bold">₹{totalValue.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-lg font-bold text-white transition-colors ${
              isBuy
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isBuy ? 'Buy' : 'Sell'} {selectedStock.symbol}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPad;