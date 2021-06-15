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
  >
    <b-card-text>
      position: {{position}}
    </b-card-text>

    <b-button href="#" variant="warning">player page</b-button>
  </b-card>
</div>
  <!-- <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Player Name:</b> {{ name }}
    </div>
    <ul class="game-content">
      <li> position: {{ position }}</li>
      <li> picture: {{ picture }}</li>
    </ul>
  </div> -->
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
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
  width: 100%;
  overflow: hidden;
}



</style>
