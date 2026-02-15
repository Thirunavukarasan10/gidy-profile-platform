// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import apiRoutes from './routes/api.js';
// import pool from './config/database.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// // API routes
// app.use('/api', apiRoutes);

// // Root route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Profile Project API',
//     version: '1.0.0',
//     endpoints: {
//       profile: '/api/profile/:id',
//       health: '/api/health'
//     }
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
//   res.status(500).json({
//     error: 'Internal server error',
//     message: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  
//   // Test database connection
//   pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//       console.error('❌ Database connection failed:', err.message);
//     } else {
//       console.log('✅ Database connected at:', res.rows[0].now);
//     }
//   });
// });

// export default app;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Profile API Server',
    version: '1.0.0',
    endpoints: {
      profile: '/api/profile/:id',
      skills: '/api/profile/:id/skills',
      timeline: '/api/profile/:id/timeline',
      socialLinks: '/api/profile/:id/social-links',
      ai: '/api/ai/generate-bio'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});