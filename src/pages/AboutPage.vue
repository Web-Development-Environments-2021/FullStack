<template>
  <div  class="about">

    
  <h1 class="text">
      Niv Meiri and Hadassa Zenu are students on their third year of Software informations system engineering Degree. 
    <br/>
    Hadassa had just gave birth to her new sweet baby-Dror , and had challenging semester. she is from Even Shmuel 
    and love to play monopoly in her free time.
    <br/>
    <br/>
    Niv is from Gilon and love to run and play soccer in his free time.
    <br/>
    here are some links to our projects.
    <br/>
    <br/>
    <b-button-group>
        <b-button  variant="danger " href="https://web-development-environments-2021.github.io/312359359/"> first site-Niv</b-button>
        <b-button variant="info" href="https://web-development-environments-2021.github.io/318593985/">first site-Hadassa</b-button>
        <b-button   variant="warning" href="https://web-development-environments-2021.github.io/Assignment2_312359359_318593985/">Packman web</b-button>

    </b-button-group>
    
  </h1>

  </div>
  
</template>

<script>
export default {
  data() {
    return {
    
    };
  }
};
</script>
<style>


.text{
    background-color: rgb(244, 245, 248);
    font-size: 19px;
  padding: 10px;
  width: 90%;
  margin-top:10px;
  height: 35%;
  margin-left: 4%;
  align-self: center;
  align-tracks: cent;
  align-items: center;
  text-align: left;
  border-radius: 18px;
  opacity: 80%;

}
.about{
width: 100%;
background-image: url("../assets/about_us.jpeg");
height: 675px;
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
    background-repeat: "no-repeat";
  background-size: '100% auto';
      font-family: "Merienda", Helvetica, Arial;

}

</style>
