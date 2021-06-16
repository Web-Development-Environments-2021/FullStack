<template>
  <div class="container">
    <div><h1 class="title mg-dark">Player Card</h1>
    <PlayerCard title="Player Card" class="Player Card" /></div>
  </div>
</template>

<script>
import PlayerCard from "../components/PlayerCard.vue";
export default {
  components: {
    PlayerCard
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Acme&family=Dancing+Script&family=Fondamento&family=Montserrat:wght@100&family=Shadows+Into+Light&display=swap");

.container{
    text-align: center;
    background-color: rgb(190, 187, 187);
  font-family: cursive, bold;
  color:black;

}
body, html {
  height: 100%;
}

div.container {
  /* The image used */
  background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/c_scale,e_blur:461,h_535,w_1024/v1623842117/zUX4nJS-soccer-background-images_isi1kc.jpg");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}



</style>