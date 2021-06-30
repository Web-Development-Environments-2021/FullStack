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
          const Details = await this.axios.get(
            "http://localhost:3000/Team/AllTeamsDetails"
          
          );


          console.log(this.$root.store.login);
          console.log("print the details!!")
          console.log(Details);
          
          localStorage.setItem('teams', JSON.stringify(Details.data.teams));
          localStorage.setItem('players', JSON.stringify(Details.data.players));
          localStorage.setItem('players_name', JSON.stringify(Details.data.players_name));
          localStorage.setItem('teams_name', JSON.stringify(Details.data.teams_name));
          localStorage.setItem('players_list', JSON.stringify(Details.data.players_list));




      } 
      catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }

    
    }
  },
  created(){
    console.log("in created main!!!")
    this.GetTeamDetails();

  }

};
</script>

<style>

.main{
  background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/c_scale,h_700,w_1300/v1623869488/1610049840_MarcusRashford_gdsx8r.jpg");
}
</style>
