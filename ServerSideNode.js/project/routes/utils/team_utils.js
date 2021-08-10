const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";


//-----------get team info from api----------------//
async function getTeamsInfo(teams_ids_list) {
    let promises = [];
    teams_ids_list.map((id) =>
      promises.push(
        axios.get(`${api_domain}/teams/${id}`, {
          params: {
            api_token: process.env.api_token,
          },
        })
      )
    );
    let teams_info = await Promise.all(promises);
    return extractRelevantTeamData(teams_info);
  }

  //-----------extract the relevant data sync----------------//
  function extractRelevanTeamData_sync(team_info) {
    array=[];
    for (let team in team_info) {
      const { name, logo_path }   =team_info[team];
      array.push({
        name: name,
        image:logo_path,
    
        })
  }
  return array;
  }


  //-----------extract the relevant data async----------------//

  async function extractRelevantTeamData(teams_info) {
    return teams_info.map((team_info) => {
      const { name, logo_path } = team_info.data.data;
      return {
        name: name,
        logo: logo_path,
        
      };
    });
  }

    //-----------extract the relevant data async for the card----------------//

  async function extractCardTeamData(team_info) {
      const { name, logo_path } = team_info.data.data;
      const { fullname } = team_info.data.data.coach.data;
      return {
        name: name,
        logo: logo_path,
        coach: fullname,
        
      };
  }
  
  //-----------extract the relevant data async for the card----------------//
  async function getCardTeamInfo(team_id){
      const info=
        await axios.get(`${api_domain}/teams/${team_id}`, {
          params: {
            api_token: process.env.api_token,
            include: "coach",
          },
        });
    return extractCardTeamData(info);
  }

  //-----------return team by its name ----------------//
  async function getTeamByName(teamName){
    const info =
    await axios.get(`${api_domain}/teams/search/${teamName}`,{
    params : {
      api_token: process.env.api_token 

    }
  });
  return extractRelevanTeamData_sync(info.data.data);}

  exports.getTeamByName=getTeamByName;
  exports.getTeamsInfo = getTeamsInfo;
  exports.getCardTeamInfo=getCardTeamInfo;