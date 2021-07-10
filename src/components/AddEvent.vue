<template>

  <b-container class="addEvent" fluid>

    
      <h2>Add new event:</h2>
      <b-form @submit.prevent="onSubmit">
    <b-row class="my-1">

   
    </b-row>

 

    <b-row class="my-1">
    <b-col sm="3">
        <label >description:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('description')" v-model="$v.form.description.$model" ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.description.required">
          stadium is required
        </b-form-invalid-feedback>
  
      </b-col>
    </b-row>

     <b-row class="my-1">
    <b-col sm="3">
        <label >eventType:</label>
      </b-col>
    <b-col sm="9">
        <b-form-select :state="validateState('eventType')" v-model="$v.form.eventType.$model" :options="eventTypes"></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.eventType.required">
          home team is required
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

   <b-row class="my-1">
    <b-col sm="3">
        <label >minute:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('minute')" v-model="$v.form.minute.$model" ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.minute.required">
          minute must be between 0-90
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

   <!-- <b-row class="my-1">
    <b-col sm="3">
        <label >game_id:</label>
      </b-col>
    <b-col sm="9">
        <b-form-input :state="validateState('game_id')" v-model="$v.form.game_id.$model" ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.game_id.required">
        </b-form-invalid-feedback>
      </b-col>
    </b-row> -->


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
  sameAs,
  not

} from "vuelidate/lib/validators";

  export default {
      
    data() {
      return {
        eventTypes:["Goal", "Offside", "Foul", "Red Card", "Yellow card"," Injury", "Substitution"],
            errors: [],
            validated: false,
          form:{
          description:"",
          minute:"",
          eventType:"",
          game_id:this.game_id
          }
        
      }
    },
    validations: {
    form: {

      description: {
        required
              },
        eventType: {
        required
      },

      minute: {
        required,
        minValue: value => value > 0,
        maxValue: value=> value<=90
      },

      game_id: {
        required
      },
    }
  },
  props:{
      game_id:{
          type:Number,
            require:true

      }
  },
    methods:{
        validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
        async submit() {
      try {
            const response = await this.axios.post(
            "http://localhost:3000/unionRep/addEvent",
            {
            game_id: this.form.game_id,
            minute: this.form.minute,
            eventType: this.form.eventType,
            description: this.form.description
            }
            );
        console.log(response);
        $forceUpdate();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        console.log(this.$v.form.errors);
        return;
      }
      this.submit();
    },
       

    },
    mounted(){
    }
  }
</script>
<style>
.addGame{
    width: 100%;
}
</style>