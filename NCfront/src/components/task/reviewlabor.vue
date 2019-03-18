<template lang="html">

  <div class="container">
    <div class="card cardstil">
      <div class="card-body">
        <h3 align="center">Review labor</h3>
        <div class="row" style="margin-top:40px;">
          <div class="col-sm-4">
              <label for="">Title of labor:</label>
          </div>
          <div class="col-sm-8">
              <textarea readonly cols="50" rows="2">{{reviewlaborr.title}}</textarea>
          </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label for="">Abstract:</label>
            </div>
            <div class="col-sm-8">
              <textarea readonly cols="50" rows="2">{{reviewlaborr.apstract}}</textarea>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label for="">Key Terms:</label>
            </div>
            <div class="col-sm-8">
              <textarea readonly cols="50" rows="2">{{reviewlaborr.keyterms}}</textarea>
            </div>
        </div>

        <div class="row" style="margin-top: 40px;">
          <div class="col-sm-6"></div>
          <div class="col-sm-2">
            <button class="btn btn-primary" v-on:click="laborRelevant('relevantan')">Accept</button>
          </div>
          <div class="col-sm-3">
            <button class="btn btn-secondary" v-on:click="laborRelevant('nerelevantan')">Decline</button>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from "../../router/http-common";
  export default  {
    name: 'reviewlabor',
    props: [],
    mounted() {
      
      this.getData();
    
    },
    data() {
      return {
        reviewlaborr: []
      }
    },
    methods: {

      laborRelevant(r){

        http
          .get('/task/completereviewlabor/' + localStorage.getItem('trenutniTaskId') + "/" + r,{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            alert("Task completed");
            window.location.href = "http://localhost:8081/#/dashboard/mytasks";
          })
          .catch()

      },

      getData(){

        http
          .get('/task/reviewlabor/' + localStorage.getItem('trenutniTaskId'),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            this.reviewlaborr = response.data;
          })
          .catch()
      }

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .reviewlabor {

  }
  .cardstil{
    margin-top: 85px;
    margin-bottom: 40px;
    width: 900px;
    margin-left: 100px; 
  }
</style>
