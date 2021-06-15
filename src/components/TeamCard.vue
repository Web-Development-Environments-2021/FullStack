<template>
    <div class="team-preview">
      <b-card
      :img-alt="logo"
      tag="article"
      style="max-width: 100%;"
      class="mb-2"
    >
      <b-card-title>{{name}}</b-card-title>
      <b-card-text>
        <br/>
        Coach: {{ coach }}
        <br/><div class="players">
        <PlayerPreview
        v-for="p in players"
        :name="p.name"
        :picture="p.image"
        :position="p.position"
        :key="p.name">
        </PlayerPreview></div>
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
        const response = await this.axios.get(
          `http://localhost:3000/team/teamFullDetails/${teamId}`,
        );
        const team = response.data;
        this.name=team.team_details.name;
        this.logo=team.team_details.logo;
        this.coach=team.team_details.coach;
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
.team-preview {
  display: inline-block;
  width: 80%;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}
.players{
    display: flex;
    width: 100%;
    columns: 5;
    flex-grow: 1;
     width: 33%;
}


</style>