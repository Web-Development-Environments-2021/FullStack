
var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");
const game_utils=require("./utils/game_utils");

/**
 * Authenticate all incoming requests by middleware and check their existance in User data base
 */

//---------- check that user is logged in-----------/
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM dbo.Users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */

//------------ adding favorite player to user's list--------------//
router.post("/addFavoritePlayer", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const player_id = req.body.playerId;
    if(user_id>0 && player_id>0  && Number.isInteger(player_id)&&  Number.isInteger(user_id)&& !isNaN(player_id) && !isNaN(user_id)){
      const bol= await users_utils.checkIfAlreadyInFavoritePlayers(user_id,player_id);
      if(bol===0){
        await users_utils.markPlayerAsFavorite(user_id, player_id);
        res.status(201).send("The player successfully saved as favorite");
      }
      else{
        throw{status:400,message:" player already in user's list "}
      }
    }
    else{
      throw{status:400,message:"problem with input- player id and user id must be positive int "}
    }
  } catch (error) {
    next(error);
  }
});



router.post("/deleteFavoritePlayer", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const player_id = req.body.playerId;
    console.log(req.body);
    if(user_id>0 && player_id>0  && Number.isInteger(player_id)&&  Number.isInteger(user_id)&& !isNaN(player_id) && !isNaN(user_id)){
      const bol= await users_utils.checkIfAlreadyInFavoritePlayers(user_id,player_id);
      if(bol===1){
        await DButils.execQuery(
          `delete from FavoritePlayers where user_id='${user_id}' and  player_id=${player_id}`
        );
        res.status(200).send("The player successfully deleted");
      }
      else{
        throw{status:400,message:" player not in user's list "}
      }
    }
    else{
      throw{status:400,message:"problem with input- player id and user id must be positive int "}
    }
  } catch (error) {
    next(error);
  }
});
//------------ adding favorite team to user's list----------------//
router.post("/addFavoriteTeam", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const team_id = req.body.teamId;
    if(user_id>0 && team_id>0  && Number.isInteger(team_id)&&  Number.isInteger(user_id)&& !isNaN(team_id) && !isNaN(user_id)){
    const num= await users_utils.checkIfAlreadyInFavoriteTeams(user_id,team_id);
      if(num===0){
      await users_utils.markTeamAsFavorite(user_id, team_id);
      res.status(201).send("The team successfully saved as favorite");
      }
      else{
        throw{status:400,message:" team already in user's list "};
      }
    }
    else{
      throw{status:400,message:"problem with input- team id and user id must be positive int "};
    }
  } catch (error) {
    next(error);
  }
});
//------------ adding favorite game to user's list---//

router.post("/addFavoriteGame", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const game_id = req.body.gameId;
    if(user_id>0 && game_id>0  && Number.isInteger(game_id)&&  Number.isInteger(user_id)&& !isNaN(game_id) && !isNaN(user_id)){
      
      //---------- check if game already in user's list------------------//
      const num= await users_utils.checkIfAlreadyInFavoriteTGames(user_id,game_id);


      //---------- check if game is in the future------------------//

      const game_exist = await DButils.execQuery(
        `select date from Games where game_id='${game_id}' and date>GETDATE() `
      );
      if(!game_exist.length){
        throw{status:400,message:" game already happaned or do not exist in system  "};

      }
      if(num===0){
        await users_utils.markGameAsFavorite(user_id,game_id);
        res.status(201).send("The game successfully saved as favorite");
    }
    else{
      throw{status:400,message:" game already in user's list "};
    }
    
    }
    else{
      throw{status:400,message:"problem with input- game id and user id must be positive int "};
    }
  } catch (error) {
    next(error);
  }
});



router.post("/deleteFavoriteGame", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let game_id = req.body.gameId;
    console.log(req.body);
    console.log("user id isss"+user_id);
    console.log("game id iss"+game_id);
    if(user_id>0 && game_id>0  && Number.isInteger(game_id)&&  Number.isInteger(user_id)&& !isNaN(game_id) && !isNaN(user_id)){
      
      //---------- check if game already in user's list------------------//
      const num= await users_utils.checkIfAlreadyInFavoriteTGames(user_id,game_id);


      //---------- check if game is in the future------------------//

      const game_exist = await DButils.execQuery(
        `select date from Games where game_id='${game_id}' and date>GETDATE() `
      );
      if(!game_exist.length){
        throw{status:400,message:" game already happaned or do not exist in system  "};

      }
      if(num===1){
        await users_utils.deleteGameAsFavorite(user_id,game_id);
        res.status(201).send("The game successfully deleted as favorite");
    }
    else{
      throw{status:400,message:" game already in user's list "};
    }
    
    }
    else{
      throw{status:400,message:"problem with input- game id and user id must be positive int "};
    }
  } catch (error) {
    next(error);
  }
});
/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const player_ids = await users_utils.getFavoritePlayers(user_id);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/favoriteTeams", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const team_ids = await users_utils.getFavoriteTeams(user_id);
    let Team_ids_array = [];
    team_ids.map((element) => Team_ids_array.push(element.team_id)); //extracting the players ids into array
    const results = await team_utils.getTeamsInfo(Team_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});
//-------------------return favorite games----------------//
router.get("/favoriteGames", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let game_ids_array=[];
    const game_ids = await users_utils.getFavoriteGames(user_id);
    game_ids.map((element) => game_ids_array.push(element.game_id));
    const results= await game_utils.getGamesInfo(game_ids_array);
    if (results.length!=0)
      res.status(200).send(results);
    else
      res.status(204).send("There is no favorite game")
  } catch (error) {
    next(error);
  }
});


//------------return maximum 3 games from top of favorite games----------------//
router.get("/max3FavoriteGames", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let game_ids_array=[];
    const game_ids = await users_utils.getFavoriteGames(user_id);
    game_ids.map((element) => game_ids_array.push(element.game_id));
    const results= await game_utils.getGamesInfo(game_ids_array);
    if (results.length!=0)
      res.status(200).send(results.slice(0,3));
    else
      res.status(200).send("There is no favorite game");
  } catch (error) {
    next(error);
  }
});

module.exports = router;



