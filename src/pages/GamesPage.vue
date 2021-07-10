<template>
<div class="general">
  <div class="managment">
      <div>



</div>
<br>
    <a ><div class="text" style="color:white">Past games</div></a>
    <b-table  :items="team_history" :fields="fieldsPast" striped responsive="sm">
      <template #cell(time)="time">
        
        {{time.item.time.substr(11,12).substr(0,5)}}
      </template>
      
      <template #cell(date)="date">
        {{date.item.date.substr(0,10)}}
      </template>
     

      <template #cell(events)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

      </template>

      <template #row-details="row">

        <b-card>

        <b-table  :items="row.item.events" :fields="fieldsEvent">
         <template #cell(time)="time">
                {{time.item.time.substr(11,12).substr(0,5)}}
            </template>
            
            <template #cell(date)="date">
              {{date.item.date.substr(0,10)}}
          </template>>
          </b-table>
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">close
        </b-button>

  
  
        
        </b-card>

      </template>
    </b-table>
    <br>
    <a><div class="text" style="color:white">Future games</div></a>
        <b-table  :items="team_future" :fields="fieldsFuture" striped responsive="sm">
             <template #cell(time)="time">
                {{time.item.time.substr(11,12).substr(0,5)}}
            </template>
            
            <template #cell(date)="date">
              {{date.item.date.substr(0,10)}}
          </template>
          <template #cell(like)="data">
                    <a>
              <FavoriteGameLike
                v-if="$root.store.username"
                :gameId="data.item.game_id"
                :home_team="data.item.home_team"
                :away_team="data.item.away_team"
                :date="data.item.date"
                :time="data.item.time"
                :stadium="data.item.stadium"
              ></FavoriteGameLike>
          </a>
          </template>
          
    </b-table>

  </div>
  </div>
</template>

<script>
import FavoriteGameLike from '../components/FavoriteGameLike.vue'

export default {
  components: { FavoriteGameLike },

 

      methods: {
        addEvent(game_id){

          console.log(game_id);
        }   
      },
    data() {
      return {
        fieldsPast: ['date', 'time', 'home_team', 'away_team','home_goal','away_goal', 'stadium', 'events'],
        fieldsEvent:['date','time', 'minute', 'EventType','description'],
        fieldsFuture: ['date', 'time', 'home_team', 'away_team', 'stadium','like'],
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
  }
</script>
<style >




.managment{
 overflow-x: hidden;
  overflow-y:scroll;
  max-height: 450px;
  margin-left: 10%;
}
.text{
  font-size:30px;
  
}
#addButton{
    width: 200px;
    height: 50px;
}
.b-table{
    background-color: white;
    opacity: 80%;
    width: 90%;
}
</style>