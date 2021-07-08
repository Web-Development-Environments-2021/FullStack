<template>

  <b-container class="addGame" fluid>
      <h2>Add new game:</h2>
      <b-form @submit.prevent="submit">
    <b-row class="my-1">
    <b-col sm="3">
        <label >Date:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('date')" v-model="$v.form.date.$model" id="type-date" type="date"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.date.required">
        date is required
      </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row class="my-1">
    <b-col sm="3">
        <label >Time:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('time')" v-model="$v.form.time.$model" id="type-time" type="time"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.time.required">
        time is required
      </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row class="my-1">
    <b-col sm="3">
        <label >Stadium:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('stadium')" v-model="$v.form.stadium.$model" ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.stadium.required">
          stadium is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.stadium.alpha">
          stadium alpha
        </b-form-invalid-feedback>  
      </b-col>
    </b-row>

     <b-row class="my-1">
    <b-col sm="3">
        <label >Home team:</label>
      </b-col>
    <b-col sm="9">
        <b-form-select :state="validateState('home_team')" v-model="$v.form.home_team.$model" :options="teams_names"></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.home_team.required">
          home team is required
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

     <b-row class="my-1">
    <b-col sm="3">
        <label >Away team:</label>
      </b-col>
    <b-col sm="9">
        <b-form-select :state="validateState('away_team')" v-model="$v.form.away_team.$model" :options="teams_names"></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.away_team.required">
          away team is required
        </b-form-invalid-feedback>
         <b-form-invalid-feedback
          v-else-if="$v.form.away_team.sameAsHome">
          host team and away team must be diffrent
        </b-form-invalid-feedback>
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
import {
  required,

  alpha,
  sameAs

} from "vuelidate/lib/validators";

  export default {
      
    data() {
      return {
          teams_names:[],
            errors: [],
            validated: false,
          form:{
          home_team:"",
          away_team:"",
          stadium:"",
          date:"",
          time:""
          }
        
      }
    },
    validations: {
    form: {

      stadium: {
        required,
        alpha
      },
        home_team: {
        required
      },
      away_team: {
        required,
        sameAsHome: sameAs("home_team")
      },
      date: {
        required,
      },
 
      time: {
        required
      },
    }
  },
    methods:{
        validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
        submit(){
            console.log(this.form.date);
            console.log(this.form.stadium);
            console.log(this.form.time);
            console.log(this.form.home_team);
            console.log(this.form.away_team);
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