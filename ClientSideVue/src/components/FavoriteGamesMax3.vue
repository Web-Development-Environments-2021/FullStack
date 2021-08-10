<template>
  <div>
    <GamePreview
      v-for="g in games"
      :id="g.game_id" 
      :home_team="g.home_team" 
      :away_team="g.away_team" 
      :date="g.date" 
      :time="g.time" 
      :stadium="g.stadium"
      :key="g.id"></GamePreview>
  </div>
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games:[],
      favoriteGame:Boolean,
    };
  },
  methods: {
    async updateGames(){
      try {
        let games_names = sessionStorage.getItem('FavoriteGames');
        let max_len=games_names.length;
        let min_num=Math.min(3,max_len)
        const games=JSON.parse(games_names).slice(0,min_num);
        this.games = [];
        this.games.push(...games);
        this.favoriteGame=true
      } catch (error) {
        console.log("error in update games")
        console.log(error);
        this.favoriteGame=false
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
