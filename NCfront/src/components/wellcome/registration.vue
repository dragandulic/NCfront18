<template lang="html">

    <div class="registration">

      <div class="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-9"><h1 class="naslov">Please Sign Up</h1></div>
        </div>
      </div>

      <div class="row ">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
          <form >
           
            <hr class="colorgraph">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="form-group">
                    <input type="text" v-model="user.name"  id="first_name" class="form-control input-lg" placeholder="First Name" tabindex="1">
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="text" v-model="user.surname"  id="last_name" class="form-control input-lg" placeholder="Last Name" tabindex="2">
                </div>
              </div>
            </div>
            <div class="form-group">
                <input type="email" v-model="user.email"  id="email" class="form-control input-lg" placeholder="Email Address" tabindex="4">
            </div>
            <div class="form-group">
              <select class="form-control input-lg" @change="handleChange" id="exampleFormControlSelect1">
                <option disabled selected>Select role</option>
                <option value="1" data-foo="1">User</option>
                <option value="2" data-foo="2">Author</option>
              </select>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <div class="form-group">
                      <input type="text" v-model="user.country"  id="country" class="form-control input-lg" placeholder="Country" tabindex="1">
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="user.city"  id="city" class="form-control input-lg" placeholder="City" tabindex="2">
                  </div>
                </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="form-group">
                  <input type="password" v-model="user.password"  id="password" class="form-control input-lg" placeholder="Password" tabindex="5">
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div>
                  <input type="password" v-model="user.confirmpassword" id="password_confirmation" class="form-control input-lg" placeholder="Confirm Password" tabindex="6">
                </div>
              </div>
            </div>
            
            <p class="poruka">{{greska}}</p>
            <hr class="colorgraph">
            
          </form>
          <div class="row">
            <div class="col-xs-12 col-md-6"><button v-on:click="registracija" class="btn btn-primary btn-block btn-lg">Register</button></div>
            <div class="col-xs-12 col-md-6"><router-link class="btn btn-success btn-block btn-lg" to="/login">Sign In</router-link></div>
          </div>

        </div>
        <div class="col-sm-3"></div>
      </div>




    </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'registration',
    props: [],
    mounted() {

    },
    data() {
      return {
        user: {
          name: "",
          surname: "",
          email: "",
          country: "",
          city: "",
          password: "",
          confirmpassword: "",
          role: ""
        },
        greska: ""
      }
    },
    methods: {

       handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            //console.log(e.target.options[e.target.options.selectedIndex].dataset.foo),
            this.user.role = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      },



      registracija(){
        var data = {
          name: this.user.name,
          surname: this.user.surname,
          email: this.user.surname,
          city: this.user.city,
          country: this.user.country,
          email: this.user.email,
          password: this.user.password,
          confirmpassword: this.user.confirmpassword,
          roles : [
		        {
		        "id": this.user.role
	      }]
        }
        console.log("ROLEEEEEEEEEEE " + this.user.role);
        http
          .post("/users/sign-up", data)
          .then(response => {
            this.greska = response.data,
            this.user.name = "",
            this.user.surname = "",
            this.user.email = "",
            this.user.city = "",
            this.user.country = "",
            this.user.password = "",
            this.user.confirmpassword = ""
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
 
.naslov{
  margin-top: 3cm;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5cm;
  margin-left: 2.3cm;
}

.poruka{
  font-size: 0.5cm;
  margin-left: 290px;
  width: 300px;
}



</style>
