<template>
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

</template>

<script>
import PlayerPreview from "./PlayerPreview.vue";
export default {
  name: "Favoriteplayers",
  components: {
    PlayerPreview
  }, 
  data() {
    return {
      players:[],
      favoritePlayer: Boolean,
    };
  },
  methods: {
    async updatePlayers(){
      console.log("response");
      try {
        let players_names = sessionStorage.getItem('Favoriteplayers');
        const players=JSON.parse(players_names);
        this.players = [];
        this.players.push(...players);
        this.favoritePlayer=true
        console.log(response);
      } catch (error) {
        console.log("error in update games")
        console.log(error);
        this.favoritePlayer=false
      }
    },

  }, 

  mounted(){
    this.updatePlayers(); 
  }
};
</script>

<style>

</style>
