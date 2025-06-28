import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('holdings');
  const [orderPadOpen, setOrderPadOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderType, setOrderType] = useState('buy'); // 'buy' or 'sell'

  const openOrderPad = (stock, type = 'buy') => {
    setSelectedStock(stock);
    setOrderType(type);
    setOrderPadOpen(true);
  };

  const closeOrderPad = () => {
    setOrderPadOpen(false);
    setSelectedStock(null);
  };

  const value = {
    currentScreen,
    setCurrentScreen,
    orderPadOpen,
    setOrderPadOpen,
    selectedStock,
    setSelectedStock,
    orderType,
    setOrderType,
    openOrderPad,
    closeOrderPad
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};