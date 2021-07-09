<template>
  <div class="managment">
      <div>
  <b-button id="addButton" v-b-modal.modal-1>Add Game</b-button>

  <b-modal id="modal-1" title="BootstrapVue">
    <!-- <p class="my-4">Hello from modal!</p> -->
    
    <AddGame title="add game"></AddGame>
  </b-modal>
</div>
<br>
    <a>Past games</a>

    <b-table  :items="past_game" :fields="fieldsPast" striped responsive="sm">
      <template #cell(events)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

      </template>

      <template #row-details="row">
        <b-card>
             <b-table  :items="row.item.events" :fields="fieldsEvent"></b-table>
             <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} add events
        </b-button>
        </b-card>
      </template>
    </b-table>
    <br>
    <a>Future games</a>
        <b-table  :items="future_game" :fields="fieldsFuture" striped responsive="sm">
    </b-table>


  </div>
</template>

<script>
import AddGame from "./AddGame.vue"
  export default {
      name:'managment',
      components:{
          AddGame
      },
      props:{
          past_game:{
              type:Array
          },
          future_game:{
              type:Array
          }
      },
    data() {
      return {
        fieldsPast: ['date', 'time', 'home_team', 'away_team', 'stadium', 'results','events'],
        fieldsEvent:['date','time', 'minute', 'EventType','description'],
                fieldsFuture: ['date', 'time', 'home_team', 'away_team', 'stadium'],


      }
    }
  }
</script>
<style >
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