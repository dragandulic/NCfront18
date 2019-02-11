<template lang="html">

  <div class="addlabor">

    <h2 align="center">Add labor</h2>

    <div class="info" style="margin-bottom: 120px;">
      <div class="fildovi" >
        <label style="font-size: 21px;">Title of labor</label>
        <input class="form-control" id="exampleFormControltitle1" type="text" placeholder="Title">
        <br><hr>
        
        <div class="row" >
          <div class="col-sm-2">
              <label style="width: 200px; font-size: 21px;">Key terms:</label>
          </div>
          <div class="col-sm-4">
              <input  class="form-control" style="width: 200px;" id="val"  type="text" placeholder="Key term">
          </div>
          <div class="col-sm-6">
            <button class="btn btn-primary" v-on:click="addkyepoint()">Add</button>
          </div>
        </div>
        
       <div class="row">
        <div class="col-sm-8">
          <button style="margin-right: 15px; margin-top: 10px;" class="btn btn-secondary" v-for="(ke,index) of keypoint">{{ke}}</button>
        </div>
       </div>
       <br><hr>
       
        <label style="margin-top: 0px; font-size: 21px;">Abstrast</label>
        <textarea class="form-control" id="exampleFormControlabstract1" rows="2" placeholder="Abstrast"></textarea>
        <br><hr>
        
        <label style="margin-top: 0px; font-size: 21px;">Scientific area</label>
        <div class="form-group">
            <select class="form-control input-lg" @change="handleChange" id="exampleFormControlSelect1">
                <option hidden selected>Select scientific area</option>
                <option v-for="(sc,index) of scientificareas"  value="index+1" :data-fo1="sc.id">{{sc.name}} </option>
            </select>
        </div>
        <br> <hr>
       
     
          <div class="row">
            <div class="col-sm-2">
                <label style="width: 200px; font-size: 21px;">PDF</label>          
            </div>
            <div class="col-sm-8">
              <input   type="file"   >
            </div>
            <!--
            <div class="col-sm-2">
              <button class="btn btn-primary" v-on:click="submitFile()">Submit</button>
            </div>   -->   
          </div>
          <br> <hr>
          

          <button class="btn btn-primary" style="margin-left: 550px; ">Submit</button>
      </div>
    </div>

  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'addlabor',
    props: ['idmag'],
    mounted() {

      this.$watch('idmag', idmag => {
        this.getscientificArea()
      }, {immediate:true})

      
    },
    data() {
      return {
        keypoint: [],
        scientificareas: [],
        newLabor:{
          scientificarea: "",

        }
      }
    },
    methods: {

    handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.user.role = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      },
      

      addkyepoint(){
        var v = document.getElementById('val').value;
        this.keypoint.push(v);
        document.getElementById('val').value = '';
      },


      getscientificArea(){
        http
          .get("/scientificarea/getscientificareao/" + this.idmag, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            this.scientificareas = response.data;
        
          })
          .catch(e=> {
            console.log(e);
          })
      }


    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .addlabor {
    
  }
  .info{
    border:1px solid black;
    margin-left: 15px;
    margin-right: 10px;
  }
  .fildovi{
    padding: 10px;
  }
</style>
