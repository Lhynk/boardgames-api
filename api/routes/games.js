const express = require('express');
const games = express.Router();
const { google } = require('googleapis');

games.get('/', (_req, res) => {
  const sheets = google.sheets({ version: 'v4', auth: res.locals.auth });
  sheets.spreadsheets.values
    .get({
      spreadsheetId: process.env.SHEET_ID,
      range: process.env.GAMES_RANGE,
    })
    .then(
      (result) => {
        res.status(200).json({
          games: mapGames(result.data.values),
        });
      },
      (err) => res.status(500).json({ error: err })
    );
});

function mapGames(games) {
  return games.map((game) => {
    return {
      title: game[0],
      image: game[1],
      sheet_name: game[2],
    };
  });
}

module.exports = games;
