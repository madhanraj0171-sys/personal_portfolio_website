import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import projectRoutes from './backend/routes/projectRoutes.js';
import contactRoutes from './backend/routes/contactRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// API health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Madhan Raj B. Portfolio API',
    database: dbStatus,
    developer: 'Madhan Raj B. (II Year CSE-C)',
  });
});

// Mount backend API routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Optional MongoDB connection if MONGO_URI is set
if (process.env.MONGO_URI) {
  console.log('Connecting to MongoDB...');
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB successfully connected.'))
    .catch((err) => console.warn('MongoDB connection notice:', err.message));
} else {
  console.log('Running with in-memory store for projects & contact messages.');
}

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
