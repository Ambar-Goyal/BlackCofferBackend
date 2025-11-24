require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const dataRoutes = require('./routes/dataRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', dataRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Insights API is running');
});

// DB + Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
