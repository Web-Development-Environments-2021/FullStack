const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


//-------------------return the details by team id----------///
async function getPlayerIdsByTeam(team_id) {
  let player_ids_list = [];
  const team = await axios.get(`${api_domain}/teams/${team_id}`, {
    params: {
      include: "squad",
      api_token: process.env.api_token,
    },
  });
  team.data.data.squad.data.map((player) =>
    player_ids_list.push(player.player_id)
  );
  return player_ids_list;
}

//---------return players info-----------//
async function getPlayersInfo(players_ids_list) {
  let promises = [];
  players_ids_list.map((id) =>
    promises.push(
      axios.get(`${api_domain}/players/${id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      })
    )
  );
  let players_info = await Promise.all(promises);
  return extractRelevantPlayerData(players_info);
}

//-------------- extract relavant data---------//
async function extractRelevantPlayerData(players_info) {
  return players_info.map((player_info) => {
    const { fullname, image_path, position_id,player_id } = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
      player_id: player_id
    };
  });
}

//-------------- extract relavant data sync---------//

 function extractRelevantPlayerData_sync(players_info) {
  array=[];
  let team=null;
  for (let value in players_info) {
    const { fullname, image_path, position_id } = players_info[value];
    if( players_info[value].team != null){
      team=players_info[value].team.data.name;
    }
    array.push({
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: team,
      })
}
return array;
 }

//-------------- extract relavant data sync---------//

async function extractCardPlayerData(player_info) {
    const {fullname, image_path, position_id, common_name, nationality, birthdate ,birthcountry,height,weight} = player_info.data.data;
    const { name } = player_info.data.data.team.data;
    return {
      name: fullname,
      image: image_path,
      position: position_id,
      team_name: name,
      common_name:common_name, 
      nationality:nationality,
      birthdate:birthdate,
      birthcountry:birthcountry,
      height:height,
      weight:weight,
    };
}
//------------return player card-----------//
async function getCardPlayerInfo(player_id){
    const info=
      await axios.get(`${api_domain}/players/${player_id}`, {
        params: {
          api_token: process.env.api_token,
          include: "team",
        },
      });
  return extractCardPlayerData(info);
}

//-----return the player search ---------//
async function getPlayerByName(player_name,pos,teamName){
  const info =
  await axios.get(`${api_domain}/players/search/${player_name}`,{
  params : {
    api_token: process.env.api_token ,
    include:"team",

  }
});
    return   extractRelevantPlayerData_sync(info.data.data);
}


async function getPlayersByTeam(team_id) {
  let player_ids_list = await getPlayerIdsByTeam(team_id);
  let players_info = await getPlayersInfo(player_ids_list);
  return players_info;
}



exports.getPlayersByTeam = getPlayersByTeam;
exports.getPlayersInfo = getPlayersInfo;
exports.getCardPlayerInfo=getCardPlayerInfo;
exports.getPlayerByName=getPlayerByName;