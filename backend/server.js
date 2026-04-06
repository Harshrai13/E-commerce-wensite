const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Expose Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('<h1>LUXE Store Backend is Running!</h1><p>Use /api/products to access endpoints.</p>');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LUXE Store API is running' });
});

app.listen(PORT, () => {
  console.log(`✨ LUXE Store API running on http://localhost:${PORT}`);
});
