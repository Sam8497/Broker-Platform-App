// Mock API responses for the broker platform

export const mockHoldings = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    avgPrice: 175.20,
    currentPrice: 182.50,
    value: 9125.00,
    pnl: 365.00,
    pnlPercent: 4.16
  },
  {
    id: 2,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 25,
    avgPrice: 2750.00,
    currentPrice: 2825.75,
    value: 70643.75,
    pnl: 1893.75,
    pnlPercent: 2.75
  },
  {
    id: 3,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 75,
    avgPrice: 320.80,
    currentPrice: 335.20,
    value: 25140.00,
    pnl: 1080.00,
    pnlPercent: 4.49
  },
  {
    id: 4,
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    quantity: 30,
    avgPrice: 245.60,
    currentPrice: 218.40,
    value: 6552.00,
    pnl: -816.00,
    pnlPercent: -3.32
  }
];

export const mockOrderbook = [
  {
    id: 1,
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 50,
    price: 175.20,
    status: 'EXECUTED',
    timestamp: '2024-01-15 10:30:00',
    realizedPnl: 0
  },
  {
    id: 2,
    symbol: 'GOOGL',
    type: 'BUY',
    quantity: 25,
    price: 2750.00,
    status: 'EXECUTED',
    timestamp: '2024-01-14 14:15:00',
    realizedPnl: 0
  },
  {
    id: 3,
    symbol: 'MSFT',
    type: 'SELL',
    quantity: 25,
    price: 340.50,
    status: 'EXECUTED',
    timestamp: '2024-01-13 11:45:00',
    realizedPnl: 492.50
  },
  {
    id: 4,
    symbol: 'TSLA',
    type: 'BUY',
    quantity: 30,
    price: 245.60,
    status: 'PENDING',
    timestamp: '2024-01-15 16:20:00',
    realizedPnl: 0
  }
];

export const mockPositions = [
  {
    id: 1,
    symbol: 'NIFTY50',
    type: 'CE',
    strike: 21000,
    expiry: '2024-01-25',
    quantity: 75,
    avgPrice: 125.50,
    ltp: 142.75,
    pnl: 1293.75,
    pnlPercent: 13.77
  },
  {
    id: 2,
    symbol: 'BANKNIFTY',
    type: 'PE',
    strike: 46500,
    expiry: '2024-01-25',
    quantity: 25,
    avgPrice: 180.20,
    ltp: 165.80,
    pnl: -360.00,
    pnlPercent: -7.99
  },
  {
    id: 3,
    symbol: 'RELIANCE',
    type: 'CE',
    strike: 2800,
    expiry: '2024-02-01',
    quantity: 100,
    avgPrice: 85.40,
    ltp: 95.60,
    pnl: 1020.00,
    pnlPercent: 11.94
  }
];

export const brokers = [
  {
    id: 1,
    name: 'Zerodha',
    logo: '🟢',
    description: 'India\'s largest broker',
    color: '#387ED1'
  },
  {
    id: 2,
    name: 'Angel One',
    logo: '👼',
    description: 'Smart trading platform',
    color: '#FF6B35'
  },
  {
    id: 3,
    name: 'Upstox',
    logo: '⬆️',
    description: 'Professional trading',
    color: '#6C5CE7'
  },
  {
    id: 4,
    name: 'ICICI Direct',
    logo: '🏦',
    description: 'Bank-backed broker',
    color: '#FF7675'
  },
  {
    id: 5,
    name: 'Groww',
    logo: '📈',
    description: 'Simple investing',
    color: '#00D68F'
  },
  {
    id: 6,
    name: 'Paytm Money',
    logo: '💰',
    description: 'Digital-first platform',
    color: '#00BAF2'
  }
];

// Simulate API calls
export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHoldings);
    }, 500);
  });
};

export const fetchOrderbook = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrderbook);
    }, 500);
  });
};

export const fetchPositions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPositions);
    }, 500);
  });
};