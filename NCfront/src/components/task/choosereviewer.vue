<template lang="html">

  <div class="container">
    <div class="card cardstil">
      <div class="card-body">
        <h3 align="center">Choose reviewer</h3>
        <div class="row">
          <div class="col-sm-6 marginn">
            <div class="row marginn1" v-for="reviewer in reviewers">
              <div class="col-sm-2">
                {{reviewer.name}}
              </div>
              <div class="col-sm-4">
                {{reviewer.surname}}
              </div>
              <div class="col-sm-4">
                {{reviewer.scientificarea}}
              </div>
              <div  class="col-sm-2">
                <button v-if="dugme === true" class="btn btn-dark" v-on:click="pick(reviewer.id)">Pick</button>
              </div>
            </div>
          </div>
          <div class="col-sm-6 buttonstil">
            <div class="row">
                <div class="col-sm-5"></div>
                <div class="col-sm-7">
                  <button class="btn btn-primary" v-on:click="filter()">Filter</button>
                  <button class="btn btn-primary" v-on:click="reviewersOfMagazine()">Reviewers</button>
                </div>
            </div>
            <div class="row">
              <div class="col-sm-5"></div>
              <div class="col-sm-7">
                  <button class="btn btn-primary" v-on:click="addReviewers()" style="margin-top: 60px; margin-left: 35px;">Add reviewers</button>                 
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from "../../router/http-common";
  export default  {
    name: 'choosereviewer',
    props: [],
    mounted() {
      this.reviewersOfMagazine()
    },
    data() {
      return {
        reviewers: [],
        dugme: false,
        odabranirecezenti: []
      }
    },
    methods: {


      reviewersOfMagazine(){
        this.dugme = false;
        http  
          .get('/task/reviewrofmagazine/' + localStorage.getItem('trenutniTaskId'),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.reviewers = response.data;
          })
          .catch(e=>{
            console.log(e);
          })


      },

      filter(){
      
      http  
        .get('/task/filtereviwer/' + localStorage.getItem('trenutniTaskId'),{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          this.dugme = true;
          this.reviewers = response.data;
        })
        .catch(e=>{
          console.log(e);
        })


      },
      pick(idr){

        this.odabranirecezenti.push(idr);
        console.log("AAAAAAAa "  + this.odabranirecezenti);

      },

      addReviewers(){
        if(this.odabranirecezenti.length >= 2){
          
          http
          .post('/task/addreviewers/' + localStorage.getItem('trenutniTaskId'),this.odabranirecezenti,{
              headers: {
                Authorization: 'Bearer ' + this.$cookie.get('token')
              }
            })
            .then(response => {
              alert("Task complete");
              window.location.href = "http://localhost:8081/#/dashboard/mytasks";
            })
            .catch(e=>{
              console.log(e);
            })



        }
        else{
          alert("Morate izabrati bar dva recezenta!");
        }
      }


    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .choosereviewer {

  }
  .cardstil{
    margin-top: 40px;
  }
  .marginn{
    margin-top: 30px;
  }
  .marginn1{
    margin-top: 20px;
  }
  .buttonstil{
    margin-top: 50px;
  }
</style>
