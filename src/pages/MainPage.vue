<template>
  <div class="main">

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

.main{
  background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/c_scale,h_700,w_1300/v1623869488/1610049840_MarcusRashford_gdsx8r.jpg");
}
</style>
