<template>

  <b-container class="addGame" fluid>
      <h2>Add new game:</h2>
      <b-form @submit.prevent="submit">
    <b-row class="my-1">
    <b-col sm="3">
        <label >Date:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input v-model="date" id="type-date" type="date"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
    <b-col sm="3">
        <label >Time:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input v-model="time" id="type-time" type="time"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
    <b-col sm="3">
        <label >Stadium:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input v-model="stadium" ></b-form-input>
      </b-col>
    </b-row>

     <b-row class="my-1">
    <b-col sm="3">
        <label >Home team:</label>
      </b-col>
    <b-col sm="9">
        <b-form-select v-model="home_team" :options="teams_names"></b-form-select>
      </b-col>
    </b-row>

     <b-row class="my-1">
    <b-col sm="3">
        <label >Away team:</label>
      </b-col>
    <b-col sm="9">
        <b-form-select v-model="away_team" :options="teams_names"></b-form-select>
      </b-col>
    </b-row>

    <b-button
        type="submit"
        variant="primary"
        style="width:50px;"
        class="mx-auto w-100"
        >Submit</b-button
      >
      </b-form>

  </b-container>
</template>

<script>
  export default {
    data() {
      return {
          teams_names:[],
          home_team:"",
          away_team:"",
          stadium:"",
          date:"",
          time:"",
        
      }
    },
    methods:{
        submit(){
            console.log(this.date);
            console.log(this.stadium);
            console.log(this.time);
            console.log(this.home_team);
            console.log(this.away_team);
        },
        team_from_local(){
            let teams_names = localStorage.getItem('teams_name');
            this.teams_names=JSON.parse(teams_names);
        }     
    },
    mounted(){
        this.team_from_local();
    }
  }
</script>
<style>
.addGame{
    width: 50%;
}
</style>