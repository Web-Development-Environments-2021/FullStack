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
    FavoriteGames  },

  methods: {
    async  GetTeamDetails(){
      try{
          const teamDetails = await this.axios.get(
            "http://localhost:3000/Team/AllTeamsDetails"
          
          );
          console.log(this.$root.store.login);
          localStorage.setItem('teamDetails', JSON.stringify(teamDetails));

      } 
      catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }

    
    }
  },
  created(){
    this.GetTeamDetails();

  }

};
</script>

<style>

.main{
  background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/c_scale,h_700,w_1300/v1623869488/1610049840_MarcusRashford_gdsx8r.jpg");
}
</style>
