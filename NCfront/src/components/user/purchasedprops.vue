<template lang="html">

 
  <div>
 <!-- 
    <div class="container">
      <div class="large-12 medium-12 small-12 cell">
        <label>File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
          <button v-on:click="submitFile()">Submit</button>
      </div>
    </div>

      <div id="singleFileUploadSuccess">
       <button v-on:click="downloadf()">sssss</button>
    </div>
 -->
 <h1 style="margin-left: 300px;margin-top: 20px;">Purchased magazines and labors</h1>
 <div class="row" style="height: 700px;">
    <div class="col-sm-1" ></div>
    <div class="col-sm-8" >
        <table class="table table-striped" style="margin-top: 50px;">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Download</th>                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(purchased,index) of purchasedml">
                <th scope="row">{{index+1}}</th>
                <td>{{purchased.type}}</td>
                <td>{{purchased.name}}</td>
                <td> <a :href="purchased.downloadurl"  target='_blank'>dwonload</a>  </td>
                
                
              </tr>
              
             
            </tbody>
          </table>


    </div>
    <div class="col-sm-3" ></div>
  </div>




  </div>


</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'purchasedprops',
    props: [],
    mounted() {
      this.myprops();
    },
    data() {
      return {
        file: '',
        purchasedml: []
      }
    },
    methods: {

       myprops: function() {
        
        http
          .get("/users/purchasedprops", {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.purchasedml = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      },


      
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },

      submitFile(){
        let formData = new FormData();
        formData.append('file', this.file);
        http
          .post("/dbfile/uploadfile", formData,{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token'),
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response =>{
           // singleFileUploadSuccess.innerHTML = "<button v-on:click=\"downloadf()\">aaaaa</button>"
            singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.data.fileDownloadUri + "' target='_blank'>" + response.data.fileDownloadUri + "</a></p>";
            singleFileUploadSuccess.style.display = "block";
            console.log("URI: " + response.data.fileDownloadUri);  
          })
          .catch(e=> {
            console.log(e);
          })


      }
/*,
      downloadf(){

      http
          .get("/dbfile/downloadFile/1")
          .then(response => {

            console.log("DOSAOO SA BACKAAA" + response.data);
          })
          .catch(e => {
            console.log(e);
          });

      }

*/

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .purchasedprops {

  }
</style>
