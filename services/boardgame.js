const { google } = require('googleapis');

const boardgameService = {
  mapGames: (games) => {
    return games.map((game) => {
      return {
        title: game[0],
        image: game[1],
        sheet_name: game[2],
      };
    });
  },

  mapCardInfo: (cards) => {
    return cards.map((card) => {
      return {
        id: card[0],
        original_text: card[1],
        text: card[2],
      };
    });
  },

  getSheetInfo: async (range, auth) => {
    const sheet = google.sheets({ version: 'v4', auth });

    const result = await sheet.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    return result.data.values;
  },
};

module.exports = boardgameService;
