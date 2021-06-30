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
  width: 365px;
  height: 500px;
  border-style:none;
  background-color: #fee6c2;
}
.card-img-top {
  width: 100%;
  height: 65%;
  object-fit: cover;
}
small{
  color: black;
  border: none;
  border-left: 1px solid rgb(179, 178, 178);
  padding-left: 10px;
  padding-right: 10px;
  height: 1.5em;
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
}
.teamPreview{
    text-decoration: none;
}
</style>