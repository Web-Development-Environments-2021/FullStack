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

.grid-main{
  display: grid;
  grid-template-columns: 48% 50%;
      grid-column-gap: 4%;

}
.favorite{
      font-family: 'Aladin', cursive;


}
</style>
