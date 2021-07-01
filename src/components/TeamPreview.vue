<template>
  <router-link
    :to="{ name: 'teamCard', params: { teamId: this.id } }"
    class="TeamPreview"
  >
    <b-card v-if="this.logo"
      :img-src="this.logo"
      img-alt="Image"
      img-top
      img-fluid="fluid"
      tag="article"
      class="mb-2"
    >
      <b-card-text id="data-content">
        <b-col>
          <b-row align-h="center">
          <h3 class="headline">{{this.name}}</h3>
          </b-row>
          <b-row align-h="center">
        </b-row>

        </b-col>
      </b-card-text>
    </b-card>
  </router-link>
</template>

<script>

export default {
      name: "TeamPreview",


  data() {
    return {
      
    };
  },
  props: {
    logo: {
      type: String,
    },
    name: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  mounted(){
    
  },
  methods:{

  }
};
</script>

<style scoped>
.card{
  width: 150px;
  height: 200px;
  border-style:none;
  background-color: whitesmoke;
  margin-left: 10px;
    align-items: center;


}
.card-img-top {
  width: 80%;
  object-fit: cover;
  margin-top: 8px;

}
small{
  color: black;
  border: none;
  border-left: 1px solid whitesmoke;
  padding-left: 10px;
  padding-right: 10px;
  height: 1em;
  bottom: 0;
  font-family: sans-serif;;
  letter-spacing: 1px;
  
 
}
h3{
  color: black;
  text-align: center;
  padding-bottom: 5px;
  font-family: monospace;
  font-weight: bold;
  font-size: 17px;
}
.teamPreview{
    text-decoration: none;
}
</style>