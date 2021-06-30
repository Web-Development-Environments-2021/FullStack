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
        :name="p.name"
        :picture="p.image"
        :position="p.position"
        :player_id="p.player_id"
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
      console.log("response");
      try {
          let teamId=939;
        // const response = await this.axios.get(
        //   `http://localhost:3000/team/teamFullDetails/${teamId}`,
        // );
        const response=localStorage.getItem("teams")
        const team = response[teamId];
        this.name=team.teamName;
        this.logo=team.teamLogo;
        this.players=team.players;
        this.team_history=team.team_history;
        this.team_future=team.team_future;
      } catch (error) {
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