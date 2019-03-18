<template lang="html">

  <div class="addlabor" >

    <h2 align="center">Add labor</h2>

    <div class="info" style="margin-bottom: 120px; margin-left: 500px; width: 800px;">
      <div class="fildovi" >
        <label style="font-size: 21px;">Title of labor</label>
        <input class="form-control" v-model="newLabor.laborname" id="exampleFormControltitle1" type="text" placeholder="Title">
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
       
        <label  style="margin-top: 0px; font-size: 21px;">Abstrast</label>
        <textarea v-model="newLabor.abstractt" class="form-control" id="exampleFormControlabstract1" rows="2" placeholder="Abstrast"></textarea>
        <br><hr>
        
        <label style="margin-top: 0px; font-size: 21px;">Scientific area</label>
        <div class="form-group">
            <select class="form-control input-lg" @change="handleChange" id="exampleFormControlSelect1">
                <option hidden selected>Select scientific area</option>
                <option v-for="(sc,index) of scientificareas"  value="index+1" :data-foo="sc.id">{{sc.name}} </option>
            </select>
        </div>
        <br> <hr>
       
     
          <div class="row">
            <div class="col-sm-2">
                <label style="width: 200px; font-size: 21px;">PDF</label>          
            </div>
            <div class="col-sm-8">
              <input type="file"  id="file" ref="file" v-on:change="handleFileUpload()"  >
            </div>
            <!--
            <div class="col-sm-2">
              <button class="btn btn-primary" v-on:click="submitFile()">Submit</button>
            </div>   -->   
          </div>
          <br> <hr>
          

          <button class="btn btn-primary" style="margin-left: 550px; " v-on:click="addL()">Submit</button>
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
        this.getscientificArea(localStorage.getItem('trenutniTaskId'))
      }, {immediate:true})

      
    },
    data() {
      return {
        file: '',
        keypoint: [],
        scientificareas: [],
        newLabor:{
          scientificareaid: null,
          magazineid: null,
          laborname: "",
          abstractt: "",
          keyterms: []
        }
      }
    },
    methods: {

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

      addL(){
        var v = document.getElementById('file').value;

        var data = {
          scientificareaid: this.newLabor.scientificareaid,
          magazineid: this.idmag,
          laborname: this.newLabor.laborname,
          abstractt: this.newLabor.abstractt,
          keyterms: this.keypoint,
          pdfname: v
        }


        http
          //ovo zakomentarisano se koristi kada hoc da dodam u elasticsearch
          //.post("/elasticsearch/addlabores", data, {
            .post("/labor/addlabor", data, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(xresponse => {
            this.newLabor.scientificareaid = null,
            this.newLabor.magazineid = null,
            this.newLabor.laborname = "",
            this.newLabor.abstractt = "",
            this.newLabor.keyterms = [],
            this.keypoint = [];

            //DODAVANJE PDF-a
            
            let formData = new FormData();
            formData.append('file', this.file);
            http
              .post("/labor/addpdfinlabor/" + xresponse.data + "/" + localStorage.getItem('procesId'), formData,{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token'),
              'Content-Type': 'multipart/form-data'
            }
            })
            .then(response =>{
              
            })
            .catch(e=> {
               console.log(e);
            })


          })
          .catch(e => {
            console.log(e);
          });
          this.submitted = true;
         
      },




    handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.newLabor.scientificareaid = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      },
      

      addkyepoint(){
        var v = document.getElementById('val').value;
        this.keypoint.push(v);
        document.getElementById('val').value = '';
      },


      getscientificArea(taskid){
        http
          .get("/scientificarea/getscientificareao/" + taskid, {
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
