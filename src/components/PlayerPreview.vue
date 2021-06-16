<template>
<div>
  <b-card
 
    :title="name"
    :img-src="picture"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
    href="#!"
  >
    <b-card-text>
      position: {{position}}
    </b-card-text>

    <b-button  :to="{ name: 'playerPage', params: { playerId: player_id } }" href="#" variant="warning">player page</b-button>
  </b-card>
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
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      picture: {
        type: String,
        required: true
      }
      
  }, 
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 250px;
  overflow: hidden;
}



</style>
