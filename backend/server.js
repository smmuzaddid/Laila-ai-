require('dotenv').config({ override: true });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');
const knowledgeRoutes = require('./routes/knowledge');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

// Security — relax CSP in production so the React app loads correctly
app.use(helmet({
  contentSecurityPolicy: isProd ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
    }
  } : false
}));

// CORS — allow all origins in production (Railway URL changes per deploy)
app.use(cors({
  origin: isProd ? true : (process.env.FRONTEND_URL || 'http://localhost:3000'),
  credentials: true
}));

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

app.use(express.json({ limit: '10mb' }));

// API routes
app.use('/api/chat', chatLimiter, chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/knowledge', knowledgeRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// Serve React frontend in production
if (isProd) {
  const frontendDist = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendDist));
  // All non-API routes → React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Railway injects PORT automatically; fallback to 5001 for local dev
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Business Consultant Server running on port ${PORT} [${isProd ? 'production' : 'development'}]`);
});
