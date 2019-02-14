<template lang="html">

  <div>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!--<a class="navbar-brand" href="dashboard.vue">Dashboard</a>-->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/dashboard/magazine">Magazine</router-link>
        </li>
        <li class="nav-item active">
            <router-link class="nav-link" to="/dashboard/search">Search</router-link>
          </li>
          <!--
        <li class="nav-item">
          <router-link class="nav-link" to="/dashboard/skills">Skills</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      -->
      </ul>
        <div class="form-inline my-2 my-lg-0">
         <!--   <router-link class="nav-link" to="/dashboard/magazine">  
        <button class="btn btn-outline-light my-2 my-sm-0" style="margin-right: 20px;"><i  style="font-size:20px" class="fa fa-user-circle"></i></button>
      </router-link>-->
      <router-link  to="/dashboard/profile">
      <button class="btn btn-outline-light my-2 my-sm-0" style="margin-right: 20px;"><i  style="font-size:20px" class="fa fa-user-circle"></i></button>
    </router-link>
        <button v-on:click="odjava" class="btn btn-outline-light my-2 my-sm-0">Logout</button>
        </div>
      

    </div>
  </nav>
  <router-view></router-view>
  <!--<button v-on:click="proba">Dugme</button>-->
  
</div>

</template>

<script lang="js">

import http from '../../router/http-common.js'
import axios from 'axios'
  export default  {
    name: 'dashboard',
    props: [],
    mounted() {

    },
    data() {
      return {
        
      }
    },
    methods: {
      odjava(){
        this.$cookie.delete('token')
        delete axios.defaults.headers.common["Authorization"]
        window.location.href= '/#/wellcome'

      },


      proba(){

       var user = {
          name: "Mrko",
          surname: "Jelaca",
          email: "marko@gmail.com",
          country: "Srbija",
          city: "Sajkas",
          password: "777",
          confirmpassword: "777"

        }


        http
          .post("/users/loginn", user)
          .then(response => {
            
              console.log("POGODIO ");
          })
          .catch(e => {
            console.log(e);
          });
          this.submitted = true;


      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">


</style>
