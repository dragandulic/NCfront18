<template lang="html">

<div class="magazine">
  <div class="split left">
    <h2 align="center">Magazines</h2>
    <div class="" style="margin-left: 19px;">
        <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Title</th>
                <th scope="col">ISSN</th>
                <th scope="col">Chif editor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mag,index) of magazines">
                <!--<th scope="row">1</th>-->
                <td>{{index+1}}</td>
                <td>{{mag.name}}</td>
                <td>{{mag.issnnumber}}</td>
                <td>{{mag.chifeditor}}</td>
                <td v-on:click="addlabor(mag.id)" ><img src="../../assets/plus-math.png" title="Add labor" width="20px" height="20px" alt="Add labor" ></td>
              </tr>
            </tbody>
          </table>
    </div>
  </div>

  <div class="split right">
    <div v-if="showw === true">
       <addlabor></addlabor>
    </div>
  </div>
</div>

</template>

<script lang="js">

import http from "../../router/http-common";
import addlabor from "../labor/addlabor"; 

  export default  {
    name: 'magazine',
    components: {
      addlabor
    },
    props: [],
    mounted() {

    },
    data() {
      return {
        magazines: [],
        showw: false
      }
    },
    methods: {

      addlabor(id){
       
        http
          .get("/magazine/checkmembershipfee/" + id)
          .then(response =>{
           if(response.data == "membershipfeetreu"){
             this.showw = true;
           }
           else{
             this.showw = false;
           }
          })
          .catch(e => {
            console.log(e);
          });
      },

      getUnits: function() {

        http
          .get("/magazine/listofmagazines")
          .then(response => {
            this.magazines = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      }
    },
    beforeMount(){
      this.getUnits()
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">

.split{
  height: 100%;
  
  position: fixed;
  z-index: 1;
  top: 56px;
  overflow-x: hidden;
  padding-top: 20px;
}

.left{
  background: indianred;
  width: 55%;
  left: 0;
}

.right {
  
  width: 45%;
  right: 0;
}
</style>
