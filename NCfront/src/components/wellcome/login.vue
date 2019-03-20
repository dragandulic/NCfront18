<template lang="html">

  <div class="login">
    
     <div class="container">
        <div class="row">
          <div class="col-sm-4">
              <p>donthavename3478@gmail.com</p>
              <p>isaisic1@gmail.com</p>
              <p>projekatad@gmail.com</p>
              <p>dragan.dulic1@gmail.com</p>
          </div>
          <div class="col-sm-4 forma" >
            <h1 align="center">Sign In</h1>
              <form class="form-signin">
                  <div class="unos">
                    <label for="inputEmail">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" v-model="user.email" placeholder="Email address" required autofocus>                   
                  </div>
    
                  <div class="unos">
                    <label for="inputPassword">Password</label>
                    <input type="password" id="inputPassword" class="form-control" v-model="user.password" placeholder="Password" required>
                  </div>
    
                  
                 </form>
                 <div class="unos">
                  <button v-on:click="prijavise" class="btn btn-lg btn-primary btn-block text-uppercase">Sign in</button>
                </div>


          </div>
          <div class="col-sm-4  "></div>
        </div>
     </div>
  </div>
 

</template>

<script lang="js">

import http from "../../router/http-common";
import axios from "axios";

  export default  {
    name: 'login',
    props: [],
    mounted() {

    },
    data() {
      return {
        user: {
          email: "",
          password: ""
        }
      }
    },
    methods: {
      prijavise(){
        var data = {
          email: this.user.email,
          password: this.user.password
        }

        http
          .post("/token/generate-token", data)
          .then(response =>{
            this.user.email="",
            this.user.password="",
            this.$cookie.set('token', response.data.token, 1) 
            axios.defaults.headers.common = {
                Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          window.location.href= '/#/dashboard'  
          })
          .catch(e=>{
            this.user.email="",
            this.user.password="",
            console.log(e);
          });
          this.subimtted = true;

      }

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .forma{
    padding-top: 199px;
  }
  .unos{
    padding-top: 25px;
  }
</style>
