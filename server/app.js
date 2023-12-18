const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const cors = require('cors');
const auth = require('./routes/auth')
const passport = require('passport');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;
require('dotenv').config({ path: '.env' })

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/', auth);

app.use(errorHandler)
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); 
