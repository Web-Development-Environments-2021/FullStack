const DButils = require("./DButils");

//-------------Games Info-return the info about game by game id -------------//
async function getGamesInfo(game_ids_array){
let promises = [];
game_ids_array.map(async (id) =>
  promises.push(
     DButils.execQuery(`SELECT game_id,date,time,home_team,away_team,stadium,Referee FROM Games WHERE game_id = '${id}' and date>GETDATE() `)
    ));
let array = await Promise.all(promises);
array=array.filter(function (element ){return element.length>0 });
Games_Info=[];
array.forEach(element => {
  Games_Info.push(element[0]);
  console.log(element[0]);
});
return Games_Info;
}


//----------------  Get Futures games from db--------------//

async function getFutureGames(team_name){
  const gameInfo=await DButils.execQuery(
    `SELECT game_id,date,time,home_team,away_team,stadium,Referee FROM Games WHERE (away_team ='${team_name}' or home_team='${team_name}') and date>=GETDATE()`);
return gameInfo;
  }


  //----------------  Get past games from db--------------//

async function getPastGames(team_name){
  const gameInfo=await DButils.execQuery(
    `SELECT * FROM Games WHERE (away_team ='${team_name}' or home_team='${team_name}') and date<GETDATE()`);
    for (const game in gameInfo){
        let id=gameInfo[game].game_id;
        const gameEvent=await DButils.execQuery(
            `SELECT * FROM Events WHERE game_id='${id}'`);
            if (gameEvent.length>0)
                gameInfo[game].events=gameEvent;
    }
return gameInfo;
  }

exports.getGamesInfo = getGamesInfo;
exports.getPastGames=getPastGames;
exports.getFutureGames=getFutureGames;