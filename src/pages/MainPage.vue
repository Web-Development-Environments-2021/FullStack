<template>
  <div class="container">

    <h1 class="title">Main Page </h1>

    <LoginPage v-if="!$root.store.username"></LoginPage>
    <FavoriteGames v-else></FavoriteGames>

    <LeagueInfo></LeagueInfo>
  </div>
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoriteGames from "../components/FavoriteGamesMax3";
import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage.vue";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoriteGames  }
};
</script>

<style>


</style>
