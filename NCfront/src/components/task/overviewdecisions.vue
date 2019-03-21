<template lang="html">

  <div class="container">
    <div class="card cardstil">
      <div class="card-body">
        <h3 align="center" class="titlestil">Overview decisions of reviewer</h3>
        <div class="row rowone" v-for="mark in marks">
          <div class="col-sm-5 colone">
            <div class="row">
              <div class="col-sm-6">
                <label>Comment:</label>
              </div>
              <div class="col-sm-6">
                {{mark.comment}}
              </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <label>Recommendation:</label>
                </div>
               <div class="col-sm-6">
                 {{mark.mark}}
              </div>
            </div>
          </div>
          <div class="col-sm-7">
          </div>
        </div>
        <div class="row radiob">
          <div class="col-sm-7">
              <form>
                  <input type="radio" v-model="procena"  name="gender" value="PRIHVATI">ACCEPTABLE <br>
                  <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="MANJE_IZMENE">ACCEPT WITH SMALL CHANGES <br>
                  <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="VECE_IZMENE">ACCEPT WITH BIG CHANGES <br>
                  <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="ODBITI">DECLINE <br>
                </form>
          </div>
          <div class="col-sm-5"></div>
        </div>
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-8">
            <button class="btn btn-primary" v-on:click="Submitdata()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from '../../router/http-common'
  export default  {
    name: 'overviewdecisions',
    props: [],
    mounted() {

      this.getData();

    },
    data() {
      return {
        marks: [],
        procena: ''
      }
    },
    methods: {

    Submitdata(){

      if(this.procena != ''){

       
      http
        .get('/task/completeoverviewdecision/' +this.procena + '/' + localStorage.getItem('trenutniTaskId'),{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          alert("Task complete");
          window.location.href = "http://localhost:8081/#/dashboard/mytasks";
        })
        .catch(e => {
          console.log(e);
        })
      }else{
        alert("Choose decision");
      }



    },



    getData(){

      http
        .get('/task/getdecisionsofreviewer/' + localStorage.getItem('trenutniTaskId'),{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          this.marks = response.data;
        })
        .catch(e => {
          console.log(e);
        })
      }


    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .overviewdecisions {

  }
  .cardstil{
    margin-top: 40px;
  }
  .titlestil{
    margin-bottom: 40px;
  }
  .colone{
    border-style: solid; 
    border-width: 1px;
    border-color: rgb(0, 4, 255);
  }
  .rowone{
    margin-top: 15px;
  }
  .radiob{
    margin-top: 40px;
  }
  
</style>
