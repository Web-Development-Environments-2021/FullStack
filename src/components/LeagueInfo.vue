<template>
    <div class="league-preview">
      <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{leagueName}}</b-card-title>
      <b-card-text>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
        <br/>
        Season_id: {{season_id}}
        <br/>
        Next_game:<GamePreview
      :id="next_game.game_id" 
      :hostTeam="next_game.home_team" 
      :guestTeam="next_game.away_team" 
      :date="next_game.date" 
      :hour="next_game.time" 
      :key="next_game.id"></GamePreview>
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";

export default {
  name: "Leagueinfo",
  components: {
    GamePreview
  }, 
 data() {
    return {
      leagueName: "", 
      season: "", 
      stage: "",
      season_id:"",
    };
  },
  methods: {
    async leagueInfo(){
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/league/getDetails",
        );
        const league = response.data;
        console.log(league);
        this.leagueName=league.league_name;
        this.season=league.current_season_name;
        this.stage=league.current_stage_name;
        this.season_id=league.current_season;
        this.next_game=league.next_game[0];
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
        this.favoriteGame=false
      }
    }
  },
    mounted(){
    console.log("favorite games mounted");
    this.leagueInfo(); 
  } 
};

</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>