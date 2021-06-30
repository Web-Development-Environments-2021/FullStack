<template>
  <b-container>
    <b-row>
      <span class="hears">
           <svg style="float:left" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" class="bi bi-heart" viewBox="0 0 16 16">
  <path href="#" v-if="isFavorite" d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
  <path href="#" v-else fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>

</svg>
        <!-- <b-icon v-if="isFavorite" icon="heart-fill" class="h5 mb-2"></b-icon>
        <b-icon
          id="favorite"
          class="h5 mb-2 hvr-grow"
          v-else
          icon="heart"
          style="cursor: pointer;"
          v-on:click="addToFavorite"
        ></b-icon> -->
      </span>
      
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "favorite",
  data() {
    return {
      isFavorite: Boolean,
    };
  },
  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.checkFavorite();
  },
  methods: {
    async checkFavorite() {
      try {
        const id = this.playerId;
        const response = await this.axios.get(
          `http://localhost:3000/user/favoritePlayers/`
        );
        for( let p in response.data){
            if (p.player_id==id){
                this.isFavorite = true;
            }

        }
        
      } catch (error) {
        console.log(error);
      }
    },
    async addToFavorite(event) {
      try {
        const id = this.playerId;
        const response = await this.axios.post(
          `http://localhost:3000/user/addFavoritePlayer`,
          {
              playerId: id
          }
        );
        this.isFavorite = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

.hears {
  padding-right: 5px;
}
</style>