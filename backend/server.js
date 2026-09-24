import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server) or matching origins
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.run.app')) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for development & student portfolio previews
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Madhan Raj Portfolio Backend API',
    database: dbStatus,
    developer: 'Madhan Raj B. (II Year CSE-C)',
  });
});

// Mount Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Connect to MongoDB & Start Server
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI) {
  console.log('Connecting to MongoDB database...');
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB successfully connected.');
    })
    .catch((err) => {
      console.warn('MongoDB connection error:', err.message);
      console.warn('Backend will continue in fallback in-memory mode.');
    });
} else {
  console.log('NOTE: MONGO_URI is not set. Using in-memory store for projects and contacts.');
  console.log('To persist data in MongoDB Atlas or local MongoDB, define MONGO_URI in your .env file.');
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
