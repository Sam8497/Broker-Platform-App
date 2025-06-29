const StockCard = ({ stock, type, onStockClick }) => {
  const isProfitable = stock.pnl >= 0;

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onStockClick(stock)}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{stock.symbol}</h3>
          <p className="text-gray-600 text-sm">{stock.name}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-800">₹{stock.currentPrice}</p>
          <p className={`text-sm font-medium ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
            {isProfitable ? '+' : ''}₹{stock.pnl.toLocaleString()} ({stock.pnlPercent.toFixed(2)}%)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
        <div>
          <p className="text-xs">Quantity</p>
          <p className="font-medium text-gray-800">{stock.quantity}</p>
        </div>
        <div>
          <p className="text-xs">Avg Price</p>
          <p className="font-medium text-gray-800">₹{stock.avgPrice}</p>
        </div>
        <div>
          <p className="text-xs">Value</p>
          <p className="font-medium text-gray-800">₹{stock.value.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StockCard;