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
      position: {{position}}
       
  </div>

</div>
<!-- <div>
  <b-card
 
    :title="name"
    :img-src="picture"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      position: {{position}}
    </b-card-text>

    <b-button  :to="{ name: 'playerPage', params: { playerId: player_id } }" href="#" variant="warning">player page</b-button>
  </b-card>
</div> -->

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
      }
      
  }, 
  mounted(){
  } 
};
</script>

<style>



.player{
    border-style: solid;
  border-radius: 100px;
  border-width: 4px;
  border-color:rgb(5, 5, 5);
  height: 200px;
  width:200px;
  text-align: center;
  font-size: 0.75rem;
  background-color: rgb(197, 196, 196);
}

.img-fluid{
  border-radius: 50px;
}

</style>
