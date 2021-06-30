<template>
    <div class="player_card">
        <img class="mx-auto" style="width: 200px;" :src="image">
        <b-card class="card" :title="name">
            
            <b-card-text>
            position:{{position}}
            <br>
            team_name:{{team_name}}
            <br>
            common_name:{{common_name}}
            <br>
            nationality:{{nationality}}
            <br>
            birthdate:{{birthdate}}
            <br>
            birthcountry:{{birthcountry}}
            <br>
            height:{{height}}
            <br>
            weight: {{weight}}
            </b-card-text>
            <div class="favorite">
              <Favorite
                v-if="$root.store.username"
                :playerId="this.playerId"
              ></Favorite>
            </div>
            <!-- <svg style="float:left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
  <path href="#" v-if="isFavorite==0" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  <path href="#" v-else fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>

</svg> -->
        </b-card>
      
  </div>
</template>

<script>
import Favorite from '../components/Favorite.vue'

export default {
  components: { Favorite },

 data() {
    return {
      playerId:0,
    name:"",
    image:"",
    position:0,
    team_name: "",
    common_name: "",
    nationality: "",
    birthdate: "",
    birthcountry: "",
    height: "",
    weight: "",
    isFavorite:0
    };
  },
  methods: {
    async playerInfo(){
      console.log("response");
      try {
          let playerId=this.$route.params.playerId;;
        const response = await this.axios.get(
          `http://localhost:3000/player/playerInfoCard/${playerId}`,
        );
        const player = response.data;
        this.name=player.name;
        this.image=player.image;
        this.position=player.position;
        this.team_name=player.team_name;
        this.common_name=player.common_name;
        this.nationality=player.nationality
        this.birthdate=player.birthdate;
        this.birthcountry=player.birthcountry;
        this.height=player.height;
        this.weight=player.weight;
        this.playerId=player.player_id;
      } catch (error) {
      }
    }
  },
    mounted(){
    this.playerInfo(); 
  } 
};

</script>

<style>
.player_card {
  display: inline-block;
  width: 50%;
  position: relative;
  margin: 10px 10px;
      align-items: center;
      float: none;

}



.player_card .team-content {
  width: 100%;
  overflow: hidden;
}
.mx-auto{
    display: inline-block;
    align-items: center;
}

.card{
    color: rgb(8, 8, 8);
    border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(46, 47, 48);
  font-size: 20px;
    
}


</style>