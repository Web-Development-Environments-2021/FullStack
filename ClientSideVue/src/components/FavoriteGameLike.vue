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
      isFavorite:false
      ,FavoriteGames:[] };
  },
  props: {
    gameId: {
      type: Number,
    },
    id: {
  type: Number,
  //required: true
},
home_team: {
  type: String,
  //required: true
},
away_team: {
  type: String,
  //required: true
},
date: {
  type: String,
  //required: true
},
time: {
  type: String,
  //required: true
},
stadium:{
  type:String,
}

  },
  computed:{

  },
  mounted() {
      this.game_id=this.$root.id;
      this.checkIfInFavorite();
  },
  methods: {
    checkIfInFavorite(){
    let games_ids=[];
    let games=JSON.parse( sessionStorage.getItem('FavoriteGames'));
    if (games){
    games.map((element) => games_ids.push(element.game_id));
    this.FavoriteGames= games_ids;
    this.isFavorite=games_ids.includes(this.gameId)

      }
    },
    deleteFromSession(game_id){
    let games=JSON.parse( sessionStorage.getItem('FavoriteGames'));
    if (games){
    games.map((element) =>{
      if  (element.game_id==game_id){
        games.pop(game_id);
      }
    })}
  sessionStorage.setItem('FavoriteGames',JSON.stringify(games));
    },

  addToSession(){
  let game={"game_id":this.gameId,"date":this.date,"away_team":this.away_team,"home_team":this.home_team,"stadium":this.stadium,"time":this.time}
  console.log(game);
  let games=JSON.parse( sessionStorage.getItem('FavoriteGames'));
  if(!games.includes(game)){
    games.push(game);
  }
  sessionStorage.setItem('FavoriteGames',JSON.stringify(games));
    },
    changeState(){
      if(this.isFavorite){
        this.isFavorite=false;
        this.deleteFromFavoriteServer();
        this.deleteFromSession(this.gameId);
      }
      else{
        this.isFavorite=true;      
        this.addToFavoriteServer();
        this.addToSession();
        

      }
    }
    ,
  
    async addToFavoriteServer() {
      try {
         await this.axios.post(
          `http://localhost:3000/user/addFavoriteGame`,
          {
              gameId: this.gameId
          }
        );
      } catch (error) {
        console.log(error);
      }
    },

      async deleteFromFavoriteServer() {
      try {
        console.log(this.gameId);
        await this.axios.post(
          `http://localhost:3000/user/deleteFavoriteGame`,
          {
            gameId:this.gameId
          }
        );
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