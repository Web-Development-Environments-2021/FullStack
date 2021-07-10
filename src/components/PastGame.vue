<template>

  <div class="game">
    <div class="grid">
    <div class="date">
      {{date.substr(0,10)}}</div>
      <div>{{home_team}}</div>
      <img :src="home_pic" width="20px">
        <div v-if="this.result" class="res">{{home_goal}}:{{away_goal}}</div>
        <div v-else>----</div>
        <img :src="away_pic" width="20px">
        <div>{{away_team}}</div>
        <div class="stadium">{{stadium}}</div>
        <div>
  <b-button v-b-toggle.collapse-1 variant="primary">Events</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card style="width:500px">
      <p class="card-text" v-for="e in events" :key="e.EventType">{{e.date.substr(0,10)}}, {{e.time.substr(11,11).substr(0,5)}}, {{e.minute}}, {{e.description}}, {{e.EventType}}</p>

    </b-card>
  </b-collapse>
</div>
    </div>

  </div>
</template>

<script>
export default {

  name: "GamePreview",
  data(){
    return{
      home_pic:"",
      away_pic:"",
      result:false,
    }
  },
  props: {
      id: {
        type: Number,
        //required: true
      },
      home_team: {
        type: String,
        //required: true
      },
      away_team: {
        type: String,
        //required: true
      },
      date: {
        type: String,
        //required: true
      },
      time: {
        type: String,
        //required: true
      },
      stadium:{
        type:String,
      },
      home_goal:{
        type:Number
      },
      away_goal:{
        type:Number
      },
      events:{
        type: Array,
      }
  }, 
  methods:{
    picOfTeams(){
      let  teams_json=localStorage.getItem("teams");
      let teams_list = JSON.parse(teams_json);
      for (let team in teams_list){
        if(teams_list[team].teamName==this.home_team){
          this.home_pic=teams_list[team].teamLogo;
        }
        if(teams_list[team].teamName==this.away_team){
          this.away_pic=teams_list[team].teamLogo;
        }

}

    },
    
  },
  mounted(){
    console.log("game preview mounted")
    this.picOfTeams();
    console.log(this.events);
    if (this.home_goal!=null){
      this.result=true;
    }
  } ,
  
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');

.game-preview {
  display: inline-block;
  width: 200px;
  height: 150px;
  position: relative;
  margin: 10px 10px;
  background-color: whitesmoke;
  border-radius: 3px;
  opacity: 65%;
  color:black;
  font-size: 18px;
    display: grid;
        font-family: "Merienda", Helvetica, Arial;




}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(10, 10, 10);
          font-family: "Merienda", Helvetica, Arial;


}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}

.game{
  width: 590px;
  background-color: whitesmoke;
  opacity: 90%;
  display: flex;
  margin-top: 10px;

  border-radius: 2px;
  
}
.grid{
  display: grid;
    grid-template-columns: 120px 80px 20px 30px 30px 80px 90px 50px;

    grid-column-gap: 8px;
    align-items: center;
    padding: 10px 0 12px 0;
    grid-auto-rows: 30px;
    width: 100%;
    font-size: 14px;
    margin-left: 10px;
          font-family: 'Aladin', cursive;

    
}
.teams{
    display: flex;

}
.b-card{
  width: 600px;
}


</style>
