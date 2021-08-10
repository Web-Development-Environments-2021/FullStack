var express = require("express");
const { unwatchFile } = require("fs");
var router = express.Router();
const players_utils = require("./utils/players_utils");


//------------ return player info by its ID------------//
router.get("/playerInfoCard/:playerId", async (req, res, next) => {
    try {
      let player_Id = parseInt(req.params.playerId);
      if(player_Id>0   && Number.isInteger(player_Id) && !isNaN(player_Id)) {
        const player_details = await players_utils.getCardPlayerInfo(
          player_Id
        );
        res.send(player_details);
        }
      else{
        throw {status:400,message:"player id must be positive int!"}
      }
    } catch (error) {
      next(error);
    }
  });


//------------ return player info by its ID------------//
router.get("/searchPlayer/:playerName", async (req, res, next) => {
  let playerName = req.params.playerName;
  let pos=req.query.position;
  let teamName=req.query.teamName;
  try {
    const player_details = await players_utils.getPlayerByName(
      playerName,pos,teamName
    );

    res.send(player_details);
  } catch (error) {
    next(error);
  }
});
module.exports = router;