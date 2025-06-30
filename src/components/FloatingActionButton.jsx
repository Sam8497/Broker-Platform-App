import { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { mockHoldings } from '../services/mockApi';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { openOrderPad, currentScreen } = useApp();
  const fabRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Keep FAB within screen bounds
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleToggle = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleQuickTrade = (type) => {
    // Get the first stock from the current screen or default to first holding
    const defaultStock = mockHoldings[0];
    openOrderPad(defaultStock, type);
    setIsExpanded(false);
  };

  return (
    <div className="fixed z-50" style={{ left: position.x, top: position.y }}>
      <div className="relative">
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3">
            <button
              onClick={() => handleQuickTrade('buy')}
              className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
              📈
            </button>
            <button
              onClick={() => handleQuickTrade('sell')}
              className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
            >
              📉
            </button>
          </div>
        )}
        
        <button
          ref={fabRef}
          onMouseDown={handleMouseDown}
          onClick={handleToggle}
          className={`w-14 h-14 rounded-full shadow-lg text-white font-bold text-xl transition-all duration-300 ${
            isExpanded
              ? 'bg-gray-600 hover:bg-gray-700 rotate-45'
              : 'bg-blue-600 hover:bg-blue-700'
          } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {isExpanded ? '×' : '+'}
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;