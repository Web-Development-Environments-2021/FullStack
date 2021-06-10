<template>
  <div class="container">
    <h1 class="title">Favorite Games</h1>
    <FavoriteGames title="Favorite Games" class="favorite Games" />
  </div>
</template>

<script>
import FavoriteGames from "../components/FavoriteGames.vue";
export default {
  components: {
    FavoriteGames
  }
};
</script>
