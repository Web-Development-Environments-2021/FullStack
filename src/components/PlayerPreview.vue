<template>
<div  class="player">
  <div  class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <router-link :to="{ name: 'playerPage', params: { playerId: player_id } }">
    <img
      :src="picture"
      class="img-fluid" href="#"
      width="100px"
      
    /></router-link>

  </div>
  <div class="card-body">
    <router-link :to="{ name: 'playerPage', params: { playerId: player_id } }"><h5 class="card-title">{{name}}</h5></router-link>
      team: {{teamName}}
      <br>
      position: {{position}}
       
  </div>

</div>

</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
      player_id:{
        type: Number
      },
      position: {
        type: Number
      },
      name: {
        type: String
      },
      picture: {
        type: String
      },
      teamName:{
        type: String
      },
      
  }, 
  mounted(){
  } 
};
</script>

<style>



.player{
    border-style: solid;
  border-radius: 20px;
  border-width: 2px;
  border-color:rgb(116, 115, 115);
  height: 180px;
  width:180px;
  text-align: center;
  font-size: 0.75rem;
  background-color: whitesmoke;
  margin-left: 10px;
  margin-top: 10px;
}

.img-fluid{
  border-radius: 50px;
  margin-bottom:-14px ;
}
.card-title{
  font-size: 14px;
  color:black;
  margin-bottom:1px ;
  margin-top:0px ;
}

</style>
