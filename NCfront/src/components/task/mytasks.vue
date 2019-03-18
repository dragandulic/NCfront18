<template lang="html">

  <div class="container">
    <h3 style="margin-left: 250px; margin-top: 40px;">My tasks</h3>
    <div class="row" style="margin-top: 150px;"></div>
    <div class="row"  v-for="(t,index) of myta" style="margin-top: 20px;">
      <div class="col-sm-7" >
        
        <ul class="list-group">
          <li class="list-group-item">{{t.name}}</li>
        </ul>
        
      </div>
      <div class="col-sm-1"></div>
      <div class="col-sm-4">
          <button class="btn btn-primary" v-on:click="doTask(t)" style="height:50px;">Do</button>
      </div>

    </div>
  </div>



 
</template>



<script lang="js">
  import http from "../../router/http-common";
  export default  {
    name: 'mytasks',
    props: [],
    mounted() {
      this.getTasks();
    },
    data() {
      return {
        myta: []
      }
    },
    methods: {

      doTask(task){
        localStorage.setItem("trenutniTaskId", task.taskid);
        http
          .get("/task/gototask/" + task.taskid,{
            headers:{
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            
            window.location.href = "http://localhost:8081/#/dashboard/" + response.data.dotaskpath;
          })
          .catch(e =>{
            console.log(e);
          })

      },

      getTasks(){

        http
          .get("/task/mytasks",{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            this.myta = response.data;
          })
          .catch(e =>{
            console.log(e);
          })
      }


    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .mytasks {

  }
</style>
