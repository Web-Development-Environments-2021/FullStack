<template>
    <div class="team-preview">
      <img class="mx-auto" style="width: 200px;" :src="logo">
      <b-card

    >
      <b-card-title>{{name}}</b-card-title>
      <b-card-text>
        <br/>
        Coach: {{ coach }}
        <br/><div class="container">
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
        <GamePreview
      v-for="g in team_history"
      :id="g.game_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.date" 
      :hour="g.time" 
      :key="g.id"></GamePreview>
      <br/>
      <GamePreview
      v-for="g in team_future"
      :id="g.game_id" 
      :hostTeam="g.home_team" 
      :guestTeam="g.away_team" 
      :date="g.date" 
      :hour="g.time" 
      :key="g.id"></GamePreview>
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
import PlayerPreview from './PlayerPreview.vue';

export default {
  name: "Leagueinfo",
  components: {
    GamePreview,
    PlayerPreview
  }, 
 data() {
    return {
      name:"",
      logo:"",
      coach:"",
      players:[],
      team_history:[],
      team_future:[],
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
        console.log(players_list);
        let teams_list = JSON.parse(teams_json);


        let team = teams_list[teamId];


        let players_ids=team.players;
                        console.log("--------");

        console.log(players_ids);

        for (let i = 0; i < players_ids.length; i++) {
          let id=players_ids[i];
          console.log(id);
          this.players.push(players_list[id]);

        }
        console.log("///this is after for");
        console.log(this.players);
        this.name=team.teamName;
        this.logo=team.teamLogo;
        this.team_history=team.team_history;
        this.team_future=team.team_future;
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
.team-preview{
  align-items: center;

}



</style>