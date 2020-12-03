const express = require('express');
const games = express.Router();
const boardgameService = require('../../services/boardgame');

const range = 'A2:C';

games.get('/', async (_req, res, next) => {
  try {
    const allGames = await boardgameService.getSheetInfo(
      process.env.GAMES_RANGE,
      res.locals.auth
    );

    success(res, {
      games: boardgameService.mapGames(allGames),
    });
  } catch (error) {
    next(error);
  }
});

games.get('/:game_name', async (req, res) => {
  let gameName = req.params['game_name'];
  let gameRange = `${gameName}!${range}`;

  try {
    const cards = await boardgameService.getSheetInfo(
      gameRange,
      res.locals.auth
    );

    success(res, {
      cards: boardgameService.mapCardInfo(cards),
    });
  } catch (error) {
    next(error);
  }
});

function success(res, response) {
  return res.status(200).json(response);
}

module.exports = games;
