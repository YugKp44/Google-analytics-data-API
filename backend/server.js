require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');

// Initialize express app
const app = express();

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('<a href="/analytics">View Analytics Data</a> | <a href="/auth/logout">Logout</a>');
  } else {
    res.send('<a href="/auth/google">Login with Google</a>');
  }
});

// Route handlers
app.use('/auth', require('./routes/auth'));
app.use('/analytics', require('./routes/analytics'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});