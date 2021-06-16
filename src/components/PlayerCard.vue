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
        </b-card>
      
  </div>
</template>

<script>


export default {

 data() {
    return {
    name:"",
    image:"",
    position:0,
    team_name: "",
    common_name: "",
    nationality: "",
    birthdate: "",
    birthcountry: "",
    height: "",
    weight: ""
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