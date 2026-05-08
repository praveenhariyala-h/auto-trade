const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const instruments = {
  'NSE:NIFTY': { price: 22485.3, name: 'NIFTY 50' },
  'NSE:RELIANCE': { price: 2975.2, name: 'RELIANCE' },
  'NSE:INFY': { price: 1725.8, name: 'INFY' },
  'NSE:TCS': { price: 4218.5, name: 'TCS' },
  'NSE:HDFCBANK': { price: 1645.2, name: 'HDFCBANK' },
  'NSE:ADANIPORTS': { price: 1218.9, name: 'ADANI Ports' },
  'NSE:SBIN': { price: 825.4, name: 'SBIN' },
  'NSE:TATASTEEL': { price: 158.6, name: 'TATASTEEL' },
};

const currentPrices = { ...instruments };

function generatePriceTick(symbol) {
  const instrument = currentPrices[symbol];
  if (!instrument) return null;

  const change = (Math.random() - 0.5) * (instrument.price * 0.002);
  const newPrice = Math.max(0.01, instrument.price + change);
  const totalChange = newPrice - instruments[symbol].price;
  const changePercent = (totalChange / instruments[symbol].price) * 100;

  currentPrices[symbol].price = newPrice;

  return {
    symbol,
    name: instrument.name,
    price: parseFloat(newPrice.toFixed(2)),
    change: parseFloat(totalChange.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

function broadcastPrice() {
  const symbol = Object.keys(instruments)[Math.floor(Math.random() * Object.keys(instruments).length)];
  const tick = generatePriceTick(symbol);

  if (tick) {
    const message = JSON.stringify(tick);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  }
}

function broadcastAllPrices() {
  Object.keys(instruments).forEach((symbol) => {
    const tick = generatePriceTick(symbol);
    if (tick) {
      const message = JSON.stringify(tick);
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message);
        }
      });
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  const welcomeMessage = JSON.stringify({
    type: 'welcome',
    message: 'Connected to TradePulse WebSocket Server',
    instruments: Object.keys(instruments),
  });
  ws.send(welcomeMessage);

  broadcastAllPrices();

  const tickInterval = setInterval(() => {
    broadcastPrice();
  }, 1000 + Math.random() * 2000);

  const fullUpdateInterval = setInterval(() => {
    broadcastAllPrices();
  }, 10000);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);

      if (data.type === 'subscribe' && data.symbols) {
        const response = JSON.stringify({
          type: 'subscribed',
          symbols: data.symbols,
        });
        ws.send(response);
      }
    } catch (e) {
      console.error('Failed to parse message:', e);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(tickInterval);
    clearInterval(fullUpdateInterval);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const PORT = process.env.WS_PORT || 8080;

server.listen(PORT, () => {
  console.log(`TradePulse WebSocket Server running on ws://localhost:${PORT}`);
  console.log('Simulating live price ticks for Indian stocks...');
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'TradePulse WebSocket Server',
    uptime: process.uptime(),
  });
});

app.get('/instruments', (req, res) => {
  res.json(Object.entries(instruments).map(([symbol, data]) => ({
    symbol,
    name: data.name,
    basePrice: data.price,
  })));
});