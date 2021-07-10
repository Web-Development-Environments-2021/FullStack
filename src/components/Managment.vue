<template>
<div class="general">
  <div class="managment">
      <div>
  <b-button id="addButton" v-b-modal.modal-1>Add Game</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <AddGame title="add game"></AddGame>
  </b-modal>


</div>
<br>
    <a ><div class="text" style="color:white">Past games</div></a>
    <b-table  :items="past_game" :fields="fieldsPast" striped responsive="sm">
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
      <b-button  size="sm" id="add event" v-b-modal.modal-2>Add Event</b-button>

        <b-modal id="modal-2" title="BootstrapVue">
         <AddEvent title="add event" :game_id="row.item.game_id"></AddEvent>
      </b-modal>
  
        
        </b-card>

      </template>
    </b-table>
    <br>
    <a><div class="text" style="color:white">Future games</div></a>
        <b-table  :items="future_game" :fields="fieldsFuture" striped responsive="sm">
             <template #cell(time)="time">
                {{time.item.time.substr(11,12).substr(0,5)}}
            </template>
            
            <template #cell(date)="date">
              {{date.item.date.substr(0,10)}}
          </template>
    </b-table>

  </div>
  </div>
</template>

<script>
import AddGame from "./AddGame.vue"
import AddEvent from "./AddEvent.vue";
  export default {
      name:'managment',
      components:{
          AddGame,AddEvent
      },
   
            props:{
          past_game:{
              type:Array
          },
          future_game:{
              type:Array
          }
      },
      methods: {
        addEvent(game_id){

          console.log(game_id);
        }   
      },
    data() {
      return {
        fieldsPast: ['date', 'time', 'home_team', 'away_team','home_goal','away_goal', 'stadium', 'events','game_id'],
        fieldsEvent:['date','time', 'minute', 'EventType','description','game_id'],
        fieldsFuture: ['date', 'time', 'home_team', 'away_team', 'stadium','game_id'],


      }
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