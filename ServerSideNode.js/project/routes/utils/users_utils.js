const DButils = require("./DButils");
const game_utils = require("./game_utils");

//---------------adding player to favorite players-------------//  

async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into FavoritePlayers values ('${user_id}',${player_id})`
  );
}
//---------------adding team to favorite teams-------------//  

async function markTeamAsFavorite(user_id, team_id) {
  await DButils.execQuery(
    `insert into FavoriteTeams values ('${user_id}',${team_id})`
  );
}

//---------------adding game to favorite games-------------//  
async function markGameAsFavorite(user_id, game_id) {
  let flag=await DButils.execQuery(
    `SELECT * FROM Games WHERE game_id = '${game_id}'`
  );
  if (flag.length!=0){
  await DButils.execQuery(
    `insert into FavoriteGames values ('${user_id}',${game_id})`
  );
  }
  else{
    throw{status:400,message:"no game with this id"}
  }
}


//delete from table 



async function deleteGameAsFavorite(user_id, game_id) {
  let flag=await DButils.execQuery(
    `SELECT * FROM Games WHERE game_id = '${game_id}'`
  );
  if (flag.length!=0){
  await DButils.execQuery(
    `delete from  FavoriteGames where user_id='${user_id}' and game_id=${game_id}`
  );
  }
  else{
    throw{status:400,message:"no game with this id"}
  }
}

//---------------get favorite players-------------//  

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where user_id='${user_id}'`
  );
  return player_ids;
}

//---------------get favorite teams-------------//  

async function getFavoriteTeams(user_id) {
  const Team_ids = await DButils.execQuery(
    `select team_id from FavoriteTeams where user_id='${user_id}'`
  );
  return Team_ids;
}


//---------------get favorite teams for cookie-------------//  

async function getFavoriteGames_cookie(user_id) {
  try{
  let game_ids_array=[];
  const game_ids = await getFavoriteGames(user_id);
  game_ids.map((element) => game_ids_array.push(element.game_id));
  const results= await game_utils.getGamesInfo(game_ids_array);
  return results;
  
} catch (error) {
  throw (error);
}
}




//---------------get favorite games-------------//  

async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `select game_id from FavoriteGames where user_id='${user_id}   '`
  );
  return game_ids;
}

//---------------check favorite players-------------//  

 async function checkIfAlreadyInFavoritePlayers(user_id,player_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where (user_id='${user_id}' and player_id='${player_id}')`
  );
  const num=player_ids.length;
  return num;
}
//---------------check Teams-------------//  

async function checkIfAlreadyInFavoriteTeams(user_id,team_id) {
  const team_ids = await DButils.execQuery(
    `select team_id from FavoriteTeams where (user_id='${user_id}' and team_id='${team_id}')`
  );
  return team_ids.length;
}


async function checkIfAlreadyInFavoriteGames(user_id,game_id) {
  const game_ids = await DButils.execQuery(
    `select game_id from FavoriteGames where (user_id='${user_id}' and game_id='${game_id}')`
  );
  return game_ids.length;
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
exports.markTeamAsFavorite=markTeamAsFavorite;
exports.getFavoriteTeams=getFavoriteTeams;
exports.markGameAsFavorite=markGameAsFavorite;
exports.getFavoriteGames=getFavoriteGames;
exports.checkIfAlreadyInFavoritePlayers=checkIfAlreadyInFavoritePlayers;
exports.checkIfAlreadyInFavoriteTeams=checkIfAlreadyInFavoriteTeams;
exports.checkIfAlreadyInFavoriteTGames=checkIfAlreadyInFavoriteGames;
exports.getFavoriteGames_cookie=getFavoriteGames_cookie;
exports.deleteGameAsFavorite=deleteGameAsFavorite;