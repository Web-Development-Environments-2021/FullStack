<template>
  <div id="app">

    <b-navbar class="navbar" toggleable="lg" variant="info" >
         
<a class="navbar-brand" :to="{ name: 'main' }" href="#">
      <img src="./assets/Games-Soccer-icon.png" :to="{ name: 'main' }" href="#"  width="40" height="38">
    </a>
    
      <!-- <b-navbar-brand    ><b>Niv and Hadassa Website</b></b-navbar-brand> -->
      <b-navbar-brand   :to="{ name: 'main' }">Superliga</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav >
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>

          <b-navbar-nav class="ml-auto" v-if="$root.store.user_id==1">
            <b-nav-item  :to="{ name: 'leagueManagment' }">LeagueManagment</b-nav-item>
          </b-navbar-nav>
          <b-nav-item  :to="{ name: 'Games' }">Games</b-nav-item>

          <b-nav-item  :to="{ name: 'About' }">About</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
          <b-nav-item  :to="{ name: 'login' }">Login</b-nav-item>
          <b-nav-item  :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item >Hello guest</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item-dropdown right>
          <template #button-content>
            {{$root.store.username}}
          </template>
          <b-dropdown-item :to="{ name: 'favoriteGames' }">favoriteGames</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'favoritePlayers' }">favoritePlayers</b-dropdown-item>

          <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",


  methods: {
    async Logout() {
      console.log("in LogOut func ")
      const response = await this.axios.post(
          "http://localhost:3000/logout"
        );
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('FavoriteGames');
      var storage = window.localStorage;
      storage.clear();
      this.$root.store.user_id=-1;
      this.$root.loggedIn = false;
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
@import url('https://fonts.googleapis.com/css2?family=Aladin&display=swap');




#app {
    overflow:hidden;

  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  min-height: 100vh;
  font-size: 18px;

width: 100%;
  background-image: url("../src/assets/soccer_field.jpeg");
  height: 550px;
  background-position: center;
  background-repeat:space;
  background-size: cover;
  background-size: '100% auto';
  font-family: "Merienda", Helvetica, Arial;

  
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.navbar{
  background-color: black;
      color: darkorange;
      text-emphasis-color: darkorange;
      text-decoration-color: darkorange;

}
.navbar-light .navbar-nav .nav-link {
    color: darkorange;
    
}
.navbar-light .navbar-brand{
      color: darkorange;

}
</style>
