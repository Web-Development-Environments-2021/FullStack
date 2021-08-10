var express = require("express");
var router = express.Router();
const players_utils = require("./utils/players_utils");
const game_utils = require("./utils/game_utils");
const team_utils = require("./utils/team_utils");

const SEASON_ID="18334";
const axios=require('axios')


//------------- return detaild of the team id input-------------//
router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  try {

    let team_id = parseInt(req.params.teamId);
    if(team_id>0   && Number.isInteger(team_id) && !isNaN(team_id)) {
    const team_details=await team_utils.getCardTeamInfo(team_id);
    const players = await players_utils.getPlayersByTeam(team_id);
    team_details["players"]=players["players"];
    console.log(players);
    const team_history=await game_utils.getPastGames(team_details.name);
    const team_future=await game_utils.getFutureGames(team_details.name);
    res.send({team_details,players,team_history,team_future});
    }
    else{
      throw {status:400,message:"team id must be positive int!"}
    }

  } catch (error) {
    next(error);
  }
});

router.get("/FutureAndPast_teamGames/:teamName", async (req, res, next) => {
  try {

    let team_name = req.params.teamName;


    const team_history=await game_utils.getPastGames(team_name);
    const team_future=await game_utils.getFutureGames(team_name);
    console.log(team_future);
    console.log(team_history);
    res.send({team_history,team_future});
    
  } catch (error) {
    next(error);
  }
});

//---------------------- reutrn team details related to its team name-------------//
router.get("/searchTeam/:teamName", async (req, res, next) => {
  let teamName = req.params.teamName;
  try {
    const teamDetails = await team_utils.getTeamByName(
      teamName
    );
    res.send(teamDetails );
  } catch (error) {
    next(error);
  }
});


router.get("/AllTeamsDetails", async (req, res, next) => {
  try{
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/teams/season/${SEASON_ID}?include=squad.player`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );

  let players={};

  let players_name=[];
  let teams_name=[];

  let to_return_dict={};

  league.data.data.map((team)=>{
    teams_name.push(
      team.name
    )  
    let players_id=[]

    team.squad.data.map((player)=>{
      players[player.player.data.player_id]={
      playerName: player.player.data.fullname,
      position :player.player.data.position_id,
      playerId: player.player.data.player_id,
      teamId :player.player.data.team_id,
      team_name: team.name,
      height : player.player.data.height,
      weight: player.player.data.weight,
      image : player.player.data.image_path,
      nationality: player.player.data.nationality,
      birthdate : player.player.data.birthdate,
      birthcountry: player.player.data.birthcountry,
      common_name:player.player.data.common_name,

                }
      players_id.push(
        player.player.data.player_id
      )  

      players_name.push(
        player.player.data.fullname
      )  

    }
    )
    to_return_dict[team.id]={
      teamName: team.name,
      teamLogo :team.logo_path,
      teamId : team.id,
      players: players_id
    }
    
  })
  dict={"players":players,"teams":to_return_dict,"players_name":players_name,"teams_name":teams_name};
  res.send( dict );

  }
  catch (error) {
    next(error);
  }
});

module.exports = router;
