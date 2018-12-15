<template lang="html">

  <div class="wellcome">


    <div class="row">
      <div class="col-sm-10"></div>
        <div class="col-sm-2">
          <router-link class="btn btn-primary" to="/registration">Registration</router-link>
          <router-link class="btn btn-primary" to="/login" style="margin-left: 19px;">Login</router-link>
        </div>
    </div>
        
    
  </div>

</template>

<script lang="js">
  export default  {
    name: 'wellcome',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
 
 .wellcome{
   margin-top: 16px;
 }



 .pozadina{
  background: url("../../assets/biblioteka.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 22.15cm;
  }
</style>
