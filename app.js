const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const structureRoutes = require('./routes/structureRoutes');

const postRoutes = require('./routes/postRoutes');

const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/structures', structureRoutes);

app.use('/api/posts', postRoutes);

module.exports = app;
