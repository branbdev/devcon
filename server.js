const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

//Connect Database
connectDB();

//Init middleware
app.use(express.json());

// app.get('/', (req, res) => res.send('API Running')); //KILL BEFORE PRODUCTION

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
