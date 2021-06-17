


<template>
  <div class="game-preview">
    <div :title="id" class="game-title">
      <b>Game Id:</b> {{ id }}
      <br>
    </div>
    <ul class="game-content">
      <li> host: {{ hostTeam }}</li>
      <li> guest: {{ guestTeam }}</li>
      <li> date: {{ date }}</li>
      <li> time: {{ hour }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      id: {
        type: Number,
        //required: true
      },
      hostTeam: {
        type: String,
        //required: true
      },
      guestTeam: {
        type: String,
        //required: true
      },
      date: {
        type: String,
        //required: true
      },
      hour: {
        type: String,
        //required: true
      }
  }, 
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 200px;
  height: 150px;
  position: relative;
  margin: 10px 10px;
  background-color: whitesmoke;
  border-radius: 3px;
  opacity: 65%;
  color:black;
  font-size: 18px;

}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(10, 10, 10);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}



</style>
