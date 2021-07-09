<template>
  <div class="manage">
    <h1 class="title">League Managment</h1>
    <div >
    <Managment title="managment" :past_game="team_history" :future_game="team_future"></Managment>
    </div>
  </div>
</template>

<script>
import Managment from "../components/Managment.vue"
export default {
  components: {
    Managment
  },
  data() {
    return {
      team_history:[],
      team_future:[],
    };
  },
  methods: {
    async allGames(){
      try {
        const response= await this.axios.get(
          `http://localhost:3000/league/getSeasonGames`,
        );
        const Games = response.data;
        console.log(Games);
        this.team_history=Games.pastGames;
        this.team_future=Games.futureGames;


      } 
      catch (error) {
      }
    }
  },
    mounted(){
    this.allGames(); 
  } 
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');

.manage{
    background-image: url("https://res.cloudinary.com/dyi0kcag6/image/upload/v1625782410/zo3Qgy_htmneg.jpg");
        font-family: 'Aladin', cursive;
        background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
          font-family: 'Aladin', cursive;
        align-items: center;
        text-align: center;
        

}

</style>