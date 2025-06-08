// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products.js';

const app = express();
app.use(cors());
app.use(express.json());
// Add CORS middleware if needed
const cors = require('cors');
app.use(cors());
mongoose.connect('mongodb://localhost:27017/shopdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
