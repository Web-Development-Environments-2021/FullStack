 <template>

  <div>
    <h1 class="title">Search Page</h1>

<b-form class="formSearch" @submit.prevent="showByQuery">
<div class="gridButton">
    
      <b-button v-on:click="selectPlayers" style="background-color : darkorange;">players</b-button>
      <b-button v-on:click="selectTeams" style="background-color : darkorange;">teams</b-button>
    
</div>
    <b-input-group  id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
    </b-input-group> 
    <br>
    <a v-if="ifPlayers">Filter By</a>
    <div v-if="ifPlayers" class="form-row">
    <div class="form-group col-md-6">
      <label for="inputTeam">Team name:</label>

        <div>
          <b-form-select v-model="selected_team" :options="teams_names"></b-form-select>
        </div>

    </div>
    <div class="form-group col-md-4">
      <label for="inputPosition">Position:</label>
      <select v-model="position" id="inputState" class="form-control">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
      </select>
    </div>
    </div>

      
      <b-button variant="success" type="submit" id="button"  >Search</b-button>
      </b-form>
      <div v-if="ifPlayers" class="col-auto my-1">
      <label class="mr-sm-2" for="inlineFormCustomSelect">sort by:
      <select v-on:click="SortByPlayer" v-model="sortBy"  class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Choose...</option>
        <option value="1">player name: A-Z</option>
        <option value="2">player name: Z-A</option>
        <option value="3">team name: A-Z</option>
        <option value="4">team name: Z-A</option>
      </select>
      </label>
    </div>
    <div v-else class="col-auto my-1">
      <label class="mr-sm-2" for="inlineFormCustomSelect">sort by:
      <select  v-on:click="SortByTeam" v-model="sortBy" class="custom-select mr-sm-2" id="inlineFormCustomSelect">
        <option selected>Choose...</option>
        <option value="3">team name: A-Z</option>
        <option value="4">team name: Z-A</option>
      </select>
      </label>
    </div>
          <div v-if="ifPlayers" class="container">
          <div class="row">
        <PlayerPreview
        v-for="p in players_by_query"
        :name="p.playerName"
        :picture="p.image"
        :position="p.position"
        :player_id="p.playerId"
        :teamName="p.team_name"
        :key="p.name">
        </PlayerPreview></div></div>
        <div v-else class="container">
          <div class="row">
        <TeamPreview
        v-for="t in teams_by_query"
        :name="t.teamName"
        :logo="t.teamLogo"
        :id="t.teamId"
        :key="t.teamId">
        </TeamPreview></div></div>




</div>
  
</template>

<script>
import PlayerPreview from '../components/PlayerPreview.vue';
import TeamPreview from '../components/TeamPreview.vue'


export default {
  components: {
    PlayerPreview,
    TeamPreview,
  },
 data() {
    return {
      searchQuery: "",
      selected:"",
      players:[],
      players_by_query:[],
      teams:[],
      teams_by_query:[],
      position:0,
      ifPlayers:true,
      teamName:"",
      sortBy:"",
      teams_names:[],
      selected_team: null

      
    };
 },


 methods:{
    showInfo(){
      var players_json = localStorage.getItem('players');
      let players_list=JSON.parse(players_json);
      for (let player in players_list) {
          this.players.push(players_list[player]);
        }
      var teams_json = localStorage.getItem('teams');
      let teams_list=JSON.parse(teams_json);
      for (let team in teams_list) {
          this.teams.push(teams_list[team]);
        }
    },
    showByQuery(){
      if (this.ifPlayers){
        this.players_by_query=[];
        for(let player in this.players){
          let good=false;
          if (this.players[player].playerName.toLowerCase().includes(this.searchQuery)){
            good=true;
            if(this.position>0){
              if (this.players[player].position!=this.position){
                good=false;
              }
            }
            if(this.selected_team!=null){
              if (!this.players[player].team_name.includes(this.selected_team))
                good=false;
            }
            if (good){
              this.players_by_query.push(this.players[player]);
            }
          }
        }
      }
      else{
        this.teams_by_query=[];
        for(let team in this.players){
          if (this.teams[team].teamName.toLowerCase().includes(this.searchQuery)){
            this.teams_by_query.push(this.teams[team]);
          }
        }
      }
    },
    selectTeams(){
      this.ifPlayers=false;
            this.sortBy="";

    },
    selectPlayers(){
      this.ifPlayers=true;
      this.sortBy="";
    },
    SortByPlayer(){
        if (this.sortBy === "1") {
        this.players_by_query.sort((a, b) => {
          return a.playerName < b.playerName ? -1 : 1;
        });
      }
      else if (this.sortBy === "2") {
        this.players_by_query.sort((a, b) => {
          return a.playerName > b.playerName ? -1 : 1;
        });
      }
      else if (this.sortBy === "3") {
        this.players_by_query.sort((a, b) => {
          return a.team_name < b.team_name ? -1 : 1;
        });
      }
      else if (this.sortBy === "4") {
        this.players_by_query.sort((a, b) => {
          return a.team_name > b.team_name ? -1 : 1;
        });
      }
    },
    SortByTeam() {
      if (this.sortBy === "3") {
        this.teams_by_query.sort((a, b) => {
          return a.teamName < b.teamName ? -1 : 1;
        });
      }
      else if (this.sortBy === "4") {
        this.teams_by_query.sort((a, b) => {
          return a.teamName > b.teamName ? -1 : 1;
        });
      }

    },
      team_from_local(){
      let teams_names = localStorage.getItem('teams_name');
      this.teams_names=JSON.parse(teams_names);
  }     
  },

  
  mounted(){
    this.showInfo()
    this.team_from_local();
  }
};
</script>
<style>
 .formSearch {
  background-color: rgb(194, 191, 191);
  padding: 10px;
  width: 60%;
  margin-bottom: 20px;
  margin-left: 20%;
  align-items: center;
  text-align: center;
  border-radius: 10px;


}

#button{
  width: 80%;
  background-color : darkorange;
}
.input-group{
  width: 40%;
  margin-left: 5px;
  display: flex;
  position: relative;
  margin: auto;
  text-align: center;
    align-items: center;

}
.input-group-text{
  font-size: 12px;
}

#search-input{
  width: 80%;
  font-size: 20px;
}
.form-row{
margin: auto;
align-items: center;
}
.gridButton{
  display: inline-grid;
  grid-template-columns: 80px 80px;
  grid-column-gap: 5px;
  align-items: center;
  color: black;

}


</style>