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
      console.log("response");
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/favoriteGames",
        );
        console.log(response);
        const games = response.data;
        this.games = [];
        this.games.push(...games);
        this.favoriteGame=true
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
    this.updateGames(); 
  }
};
</script>

<style></style>
