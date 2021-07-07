<template>
  <div class="container">

    <h1 class="title">Main Page </h1>
    <div class="grid-main">
 <div><LeagueInfo></LeagueInfo></div>
    <div><LoginPage v-if="!$root.store.username"></LoginPage>
    <div v-else><h2>Favorite games:</h2>
    <FavoriteGames ></FavoriteGames></div></div>
    </div>

    
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
          console.log(Details);
          
          localStorage.setItem('teams', JSON.stringify(Details.data.teams));
          localStorage.setItem('players', JSON.stringify(Details.data.players));
          localStorage.setItem('players_name', JSON.stringify(Details.data.players_name));
          localStorage.setItem('teams_name', JSON.stringify(Details.data.teams_name));




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

div.container{
  
width: 100%;
  /* background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/c_scale,h_900,w_1300/v1623869488/1610049840_MarcusRashford_gdsx8r.jpg");
height: 100%;
background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
}
.grid-main{
  display: grid;
  grid-template-columns: 50% 50%;
      grid-column-gap: 2%;

}
.body{
  background-color: rgb(212, 211, 211);
}
</style>
