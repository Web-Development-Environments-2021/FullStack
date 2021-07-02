<template>
  <div class="container">
    <h1 class="title">League Managment</h1>
    <div >
    <AddGame title="add game"  />
    </div>
  </div>
</template>

<script>
import AddGame from "../components/AddGame.vue";
export default {
  components: {
    AddGame
  }
};
</script>
<style>
.addGame{
  width: 50%;
}
</style>