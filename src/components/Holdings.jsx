import { useState, useEffect } from 'react';
import { fetchHoldings } from '../services/mockApi';
import { useApp } from '../contexts/AppContext';
import StockCard from './StockCard';
import LoadingSpinner from './LoadingSpinner';

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openOrderPad } = useApp();

  useEffect(() => {
    const loadHoldings = async () => {
      try {
        const data = await fetchHoldings();
        setHoldings(data);
      } catch (error) {
        console.error('Error loading holdings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHoldings();
  }, []);

  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalPnl = holdings.reduce((sum, holding) => sum + holding.pnl, 0);
  const totalPnlPercent = totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-6 text-white">
        <h2 className="text-lg font-medium mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-blue-100 text-sm">Total Value</p>
            <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm">Total P&L</p>
            <p className={`text-xl font-bold ${totalPnl >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toLocaleString()} ({totalPnlPercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {holdings.map((holding) => (
          <StockCard
            key={holding.id}
            stock={holding}
            type="holding"
            onStockClick={(stock) => openOrderPad(stock, 'sell')}
          />
        ))}
      </div>
    </div>
  );
};

export default Holdings;