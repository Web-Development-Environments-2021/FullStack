<template>
  <div class="container">
    <h1 class="title">Add Game</h1>
    <b-form @submit.prevent="onGame" @reset.prevent="onReset">
        
 <div>
    <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :active-picker.sync="Datepicker"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>

      <b-form-group
        id="input-group-date"
        label-cols-sm="3"
        label="Date:"
        label-for="date">
         <b-form-datepicker 
          v-model="$v.form.date.$model"
         :date-disabled-fn="Datepicker" 
         :type='date'
         locale="en"></b-form-datepicker>
        <!-- <b-form-input
          id="date"
          v-model="$v.form.date.$model"
          type="text"
          :state="validateState('date')"
        ></b-form-input> -->
        <b-form-invalid-feedback v-if="!$v.form.date.required">
          Date is required
        </b-form-invalid-feedback>        
      </b-form-group>

         


      <b-form-group
        id="input-group-time"
        label-cols-sm="3"
        label="Time:"
        label-for="time">
        <b-form-input
          id="time"
          v-model="$v.form.time.$model"
          type="text"
          :state="validateState('time')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.time.required">
          Time is required
        </b-form-invalid-feedback>        
      </b-form-group>

           <b-form-group
        id="input-group-homeTeam"
        label-cols-sm="3"
        label="Home team:"
        label-for="Home team">
        <b-form-select
          id="home_team"
          v-model="$v.form.home_team.$model"
          type="text"
          :options="countries"
          :state="validateState('home_team')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.home_team.required">
          Home team is required
        </b-form-invalid-feedback>        
      </b-form-group>


           <b-form-group
        id="input-group-awayTeam"
        label-cols-sm="3"
        label="Away team:"
        label-for="Away team">
        <b-form-select
          id="away_team"
          v-model="$v.form.away_team.$model"
          type="text"
          :options="countries"
          :state="validateState('away_team')"
        ></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.away_team.required">
          Away team is required
        </b-form-invalid-feedback>        
      </b-form-group>

         <b-form-group
        id="input-group-stadium"
        label-cols-sm="3"
        label="Stadium:"
        label-for="stadium">
        <b-form-input
          id="stadium"
          v-model="$v.form.stadium.$model"
          type="text"
          :state="validateState('stadium')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.stadium.required">
          Stadium is required
        </b-form-invalid-feedback>        
      </b-form-group>

    </b-form>
  </div>
</template>

<script>
import countries from "../assets/countries";
import Datepicker from '../../node_modules/vuejs-datepicker';

import {
  required

} from "vuelidate/lib/validators";

export default {
  name: "addGame",
  data() {
    return {
      form: {
        date:"",
        time:"",
        home_team:"",
        away_team:"",
        stadium:""

      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false,

    };
  },
  validations: {
    form: {
      date: {
        required

      },
      time: {
        required

      },
        home_team: {
        required
      },
      away_team: {
        required
      },

      stadium: {
        required
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day === 13
      },
    
    onReset() {
      this.form = {
          date:"",
        time:"",
        home_team:"",
        away_team:"",
        stadium:""

        
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
