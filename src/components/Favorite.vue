<template>

  <b-container>

      <span class="hears">
     <svg v-if="this.isFavorite" v-on:click="changeState" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
<svg v-else v-on:click="changeState" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
        
      </span>

  </b-container>

</template>


<script>
import FavoriteGamesVue from './FavoriteGames.vue';
export default {
  name: "favorite",
  data() {
    return {
      isFavorite: false,
      FavoriteGames:[]
    };
  },
  props: {
    playerId: {
      type: Number,
    },
  },
  mounted() {
    this.checkFavorite();
  },
  methods: {
    async checkFavorite() {
      try {
        const id = this.playerId;
        

        let players_details= JSON.parse( sessionStorage.getItem('Favoriteplayers'));
;
        for (var ids=0; ids< players_details.length;ids++){
          this.FavoriteGames.push(players_details[ids].player_id);
        }
        console.log(response.data);
        for( let p in response.data){
            if (p.player_id==id){
                this.isFavorite = true;
            }

        }
        if( this.FavoriteGames.includes(this.playerId)){
          this.isFavorite=true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    changeState(){
      this.isFavorite=!this.isFavorite
      if( this.isFavorite){
        this.FavoriteGames.push(this.playerId)
        this.addToFavorite();
      }
      else{
        //to delete from fav server
          for (var i=0; i< this.FavoriteGames.length;i++){
          if (this.FavoriteGames[i]==this.playerId)
            this.FavoriteGames.splice(i, 1);
        }
          this.deleteFromFavorite();
      }
    }
    ,



    
    async addToFavorite() {
      try {
         await this.axios.post(
          `http://localhost:3000/user/addFavoritePlayer`,
          {
              playerId: this.playerId
          }
        );
        this.isFavorite = true;
      } catch (error) {
        console.log(error);
      }
    },

      async deleteFromFavorite() {
      try {
        await this.axios.post(
          `http://localhost:3000/user/deleteFavoritePlayer`,
          {
              playerId: this.playerId
          }
        );
        this.isFavorite = false;
      } catch (error) {
        console.log(error);
      }
    },


   deleteFromSession(player_id){
    let players=JSON.parse( sessionStorage.getItem('Favoriteplayers'));
    if (players){
    players.map((element) =>{
      if  (element.player_id==player_id){
        players.pop(player_id);
      }
    })}
  sessionStorage.setItem('Favoriteplayers',JSON.stringify(players));
    },

  addToSession(){
  let player={"game_id":this.gameId,"date":this.date,"away_team":this.away_team,"home_team":this.home_team,"stadium":this.stadium,"time":this.time}
  console.log(game);
  let players=JSON.parse( sessionStorage.getItem('Favoriteplayers'));
  if(!players.includes(player)){
    players.push(player);
  }

  },
  }
};
</script>

<style>

.hears {
  padding-right: 5px;
}
</style>