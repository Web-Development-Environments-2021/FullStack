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
export default {

  name: "favoriteGameLike",
  data() {
    return {
      isFavorite:false,
      FavoriteGames:[]
    };
  },
  props: {
    gameId: {
      type: Number,
    },
  },
  mounted() {
      this.game_id=this.$root.id;
  },
  methods: {
    changeState(){
        console.log("game id from prop"+this.gameId);
      if( this.$root.FavoriteGamesArr.includes()){
        // to add to favorite
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
          `http://localhost:3000/user/addGamePlayer`,
          {
              gameId: this.playerId
          }
        );
        this.isFavorite = true;
      } catch (error) {
        console.log(error);
      }
    },

      async deleteFromFavorite() {
      try {
        await this.axios.delete(
          `http://localhost:3000/user/deleteFavoriteGame`,
          {
              gameId: this.playerId
          }
        );
        this.isFavorite = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

.hears {
  padding-right: 5px;
}
</style>