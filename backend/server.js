import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import shareRoutes from './routes/share.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/share', shareRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'File Sharing API'
  });
});


app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

// Connect to DB and start server
connectDB().then(() => {
  console.log('✅ MongoDB Connected');
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 API Base URL: http://localhost:${PORT}/api`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});