const express = require('express');
const { google } = require('googleapis');
const app = express();

const games = require('./api/routes/games');

// Gets the auth object from google
// to authenticate in sheets API.
const gooogle_auth = new google.auth.GoogleAuth({
  keyFile: process.env.CREDENTIALS,
  scopes: [process.env.SHEET_SCOPE],
});

app.use((_req, res, next) => {
  // Sends the google auth across each request.
  res.locals.auth = gooogle_auth;
  next();
});

app.use('/api/games', games);

module.exports = app;
