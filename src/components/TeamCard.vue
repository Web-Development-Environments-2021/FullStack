<template>
    <div class="team-preview">
      <h1>{{name}}</h1>
      <img class="mx-auto" style="width: 200px;" :src="logo">

        <br/>
        <br>        
                <div class="games">
        <div><br>
        <h3>Past game:</h3>
        <div v-if="this.past">
    <PastGame
      v-for="g in team_history"
      :id="g.game_id" 
      :home_team="g.home_team" 
      :away_team="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :stadium="g.stadium"
      :events="g.events"
      :key="g.id"></PastGame></div>
      <h5 v-else>There is no past games</h5>
    </div>
<div><br><h3>Future game:</h3>
<div v-if="this.future">
      <GamePreview
      v-for="g in team_future"
      :id="g.game_id" 
      :home_team="g.home_team" 
      :away_team="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :stadium="g.stadium"
      :key="g.id"></GamePreview></div>
      <h5 v-else>There is no future games</h5>

</div>
        </div>
        <br>
        <h3>Players:</h3>
        <div class="container">
          <div class="row">
        <PlayerPreview
        v-for="p in players"
        :name="p.playerName"
        :picture="p.image"
        :position="p.position"
        :player_id="p.playerId"
        :teamName="p.team_name"
        :key="p.name">
        </PlayerPreview></div></div>
        <br/>

  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
import PastGame from "./PastGame.vue";
import PlayerPreview from './PlayerPreview.vue';

export default {
  name: "Leagueinfo",
  components: {
    GamePreview,
    PlayerPreview,
    PastGame
  }, 
 data() {
    return {
      name:"",
      logo:"",
      coach:"",
      players:[],
      team_history:[],
      team_future:[],
      past:false,
      future:false
    };
  },
  methods: {
    async teamInfo(){
      try {
        console.log("///in team info");
        
        let teamId=this.$route.params.teamId;
        console.log(teamId);
        let  teams_json=localStorage.getItem("teams");
        let  players_json=localStorage.getItem("players");
        // extracting the objects from json//
        let players_list=JSON.parse(players_json);
        let teams_list = JSON.parse(teams_json);


        let team = teams_list[teamId];


        let players_ids=team.players;


        for (let i = 0; i < players_ids.length; i++) {
          let id=players_ids[i];
          this.players.push(players_list[id]);

        }
        console.log("///this is after for");
        this.name=team.teamName;
        this.logo=team.teamLogo;

        const response= await this.axios.get(
          `http://localhost:3000/team//FutureAndPast_teamGames/${team.teamName}`,
        );
        const teamGames = response.data;
        console.log(teamGames);
        this.team_history=teamGames.team_history;
        this.team_future=teamGames.team_future;
        console.log(this.team_history);
        console.log(this.team_future);
        if (this.team_history.length>0){
          this.past=true;
        }
        if (this.team_future.length>0){
          this.future=true;
        }
        
      } 
      catch (error) {
      }
    }
  },
    mounted(){
    this.teamInfo(); 
  } 
};

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');
.team-preview{
  align-items: center;
   font-family: 'Aladin', cursive;
   margin-left: -50px;
   float: unset;

}
.games{
      display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 3%;
        align-items: center;
}




</style>