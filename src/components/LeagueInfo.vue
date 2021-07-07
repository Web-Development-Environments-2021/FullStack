<template>
    <div class="league-preview">
      <h2> {{leagueName}}</h2>
        Season: {{ season }}
        <br/>
        Stage: {{ stage }}
        <br/>
        Season_id: {{season_id}}
        <br/>
        <br>
        Next_game:<GamePreview
      :id="next_game.game_id" 
      :home_team="next_game.home_team" 
      :away_team="next_game.away_team" 
      :date="next_game.date" 
      :time="next_game.time" 
      :stadium="next_game.stadium"
      :key="next_game.id"></GamePreview>
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
      next_game:[]
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
  width: 100%;
  position: relative;
  background-color: whitesmoke;

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