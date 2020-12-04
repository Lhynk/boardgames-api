const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();

const games = require('./api/routes/games');

// Gets the auth object from google
// to authenticate in sheets API.
const gooogle_auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIALS,
  scopes: [process.env.SHEET_SCOPE],
});

app.use(cors());

app.use((_req, res, next) => {
  // Sends the google auth across each request.
  res.locals.auth = gooogle_auth;
  next();
});

app.use('/api/games', games);

app.use((error, _req, res, _next) => {
  res.status(error['code']).json({ error: error['errors'] });
});

module.exports = app;
