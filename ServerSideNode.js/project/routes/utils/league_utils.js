const axios = require("axios");
const LEAGUE_ID = 271;
const DButils = require("./DButils");

//hard coded due to the lake of stage
const stage=77453565;


//----------- Get league details--------//
async function getLeagueDetails() {
  const gameInfo=await DButils.execQuery(  `SELECT TOP 1 game_id,date,time,home_team,away_team,stadium,Referee FROM  Games where date>=GETDATE() ORDER BY Games.date ASC `)


  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  //sesson id from api
  let season=null;
  let season_id=null;
  if(league.data.data){
    season=league.data.data.season.data.name;
    season_id=league.data.data.current_season_id;

  }
  if(league ){
  return {
    league_name: league.data.data.name,
    current_season_name: season,
    current_stage_name: stage,
    current_season: season_id,
    next_game: gameInfo
      };
}
else{
  throw{status:400,message:"error with league request"}
}
}


exports.getLeagueDetails = getLeagueDetails;
