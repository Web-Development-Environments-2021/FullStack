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
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');

.container{
    text-align: center;
      font-family: 'Aladin', cursive;
  color:black;

}
body, html {
  height: 100%;
}





</style>