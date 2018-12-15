<template lang="html">

  <div class="proba">
      
     <h1>Proba</h1>
     <button v-on:click="registruj">Potvrdi</button>
  </div>

</template>



<script lang="js">

import http from "../router/http-common";

  export default  {
    name: 'proba',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      registruj() {
        var data = {
          email:  "dula@gmail.com",
          name: "dule",
          password: "546"
        };

        http
          .post("/users/sign-up", data)
          .then(response => {
            console.log("Uspenoooooooo")
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
