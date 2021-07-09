<template>
<div class="allGames">
    <div><br>
        <h2>Past game:</h2>
    <PastGame
      v-for="g in team_history"
      :id="g.game_id" 
      :home_team="g.home_team" 
      :away_team="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :stadium="g.stadium"
    :events="g.events"
    :home_goal="g.home_goal"
    :away_goal="g.away_goal"

      :key="g.id"></PastGame>
    </div>
<div><br><h2>Future game:</h2>
      <GamePreview
      v-for="g in team_future"
      :id="g.game_id" 
      :home_team="g.home_team" 
      :away_team="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :stadium="g.stadium"

      :key="g.id"></GamePreview>
</div>
</div>
    
</template>
<script>
import GamePreview from "../components/GamePreview.vue";
import PastGame from "../components/PastGame.vue";

export default {
    components: {
        GamePreview,
        PastGame
    }, 
 data() {
    return {
      team_history:[],
      team_future:[],
    };
  },
  methods: {
    async allGames(){
      try {
        const response= await this.axios.get(
          `http://localhost:3000/league/getSeasonGames`,
        );
        const Games = response.data;
        console.log(Games);
        this.team_history=Games.pastGames;
        this.team_future=Games.futureGames;


      } 
      catch (error) {
      }
    }
  },
    mounted(){
    this.allGames(); 
  } 
};

</script>
<style >
.allGames{
    display: grid;
    grid-template-columns: 48% 48%;
    grid-column-gap: 10px;
        align-items: center;

}
</style>