var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const DButils = require("./utils/DButils");

//----------------return league details, leauge id is 271 constant-------//
router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});
router.get("/getSeasonGames", async (req, res, next) => {
  try {
    const pastGames=await DButils.execQuery(
      `SELECT * FROM Games WHERE date<GETDATE()`);
      for (const game in pastGames){
        let id=pastGames[game].game_id;
        const gameEvent=await DButils.execQuery(
            `SELECT * FROM Events WHERE game_id='${id}'`);
            if (gameEvent.length>0)
                pastGames[game].events=gameEvent;
    }
      const futureGames=await DButils.execQuery(
        `SELECT * FROM Games WHERE date>=GETDATE()`);
    res.send({pastGames,futureGames});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
