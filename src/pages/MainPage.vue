<template>
  <div class="main">
<br>
<br>
    <div class="grid-main">
 <div><LeagueInfo></LeagueInfo></div>
    <div><LoginPage v-if="!$root.store.username"></LoginPage>
    <div class="favorite" v-else><h2>My favorite games:</h2>
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

@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');

.main{
  
width: 100%;
  background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/v1625744808/Qtyjme_d6mwpa.jpg");
height: 550px;
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
    background-repeat: "no-repeat";
  background-size: '100% auto';
      font-family: "Merienda", Helvetica, Arial;

}
.grid-main{
  display: grid;
  grid-template-columns: 48% 50%;
      grid-column-gap: 4%;

}
.favorite{
      font-family: 'Aladin', cursive;


}
</style>
