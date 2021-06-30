 <template>
  <div>
    
    <h1 class="title">Search Page</h1>
    <b-input-group prepend="Search Query:" id="search-input">
      <b-form-input v-model="searchQuery"></b-form-input>
      <b-input-group-append>
            <b-form-select v-model="selected" :options="options" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template #first>
        <b-form-select-option :value="null" disabled>-- Search by --</b-form-select-option>
      </template>

      <!-- These options will appear after the ones from 'options' prop -->
      <b-form-select-option value="players">Players</b-form-select-option>
      <b-form-select-option value="Teams">Teams</b-form-select-option>
    </b-form-select>


        <b-form-select    v-model="selected_player" :options="options"  class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template #first>
        <b-form-select-option :value="null" disabled>--Filter by --</b-form-select-option>
      </template>

      <!-- These options will appear after the ones from 'options' prop -->
      <b-form-select-option value="filter by position" v-if="selected=='players'" > position</b-form-select-option>
      <b-form-select-option value="Teams"  v-if="selected=='players'" > team</b-form-select-option>


    </b-form-select>
        <b-button variant="success">Search</b-button>
      </b-input-group-append>
    </b-input-group>
      <br/>





    <div class="mt-3" >Selected: <strong>{{ selected }}</strong></div>




    Your search Query: {{ searchQuery }}

    






      
  </div>


  
</template>

<script>
  var retrievedObject = localStorage.getItem('teams');
export default {
 data() {
     var retrievedObject = localStorage.getItem('teamDetails');
    return {
      searchQuery:retrievedObject,
      selected:"",
      
    };
    
      
  },
}
</script>