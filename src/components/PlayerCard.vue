<template>
    <div class="player_card">
        <img class="mx-auto" style="width: 200px;" :src="image">
        <b-card class="player" :title="name">
            
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
          let playerId=this.$route.params.playerId;
          let  players_json=localStorage.getItem("players");
        let players_list=JSON.parse(players_json);
    
        let player = players_list[playerId];
        this.name=player.playerName;
        this.image=player.image;
        this.position=player.position;
        this.team_name=player.team_name;
        this.common_name=player.common_name;
        this.nationality=player.nationality
        this.birthdate=player.birthdate;
        this.birthcountry=player.birthcountry;
        this.height=player.height;
        this.weight=player.weight;
        this.playerId=player.playerId;
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

.player{
    color: rgb(8, 8, 8);
    border-style: solid;
  border-radius: 6px;
  border-width: 5px;
  border-color:rgb(46, 47, 48);
  font-size: 16px;
  opacity: 60%;
    
}



</style>