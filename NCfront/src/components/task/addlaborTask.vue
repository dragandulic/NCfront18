<template lang="html">

  <div class="container">
      <div class="card cardstil">
        <div class="card-body">
           <h3 align="center">Add labor in PDF</h3>
           <div class="row" v-for="field in formFields">
            <div class="col-sm-4">
              <label class="labelstil">{{field.label}}:</label>
            </div>
            <div class="col-sm-8">
              <div v-if="field.id === 'pdf'">
                  <input class="inputstil" type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"  >
              </div>
              <div v-else-if="field.id === 'keyterms'">
                  <input class="kyetermstil" id="val"  type="text" placeholder="Key term">
                  <button class="btn btn-primary" v-on:click="addkyepoint()" style="height: 33px; margin-left: 40px;">Add</button>
                  <br>
                  <div class="row" style="margin-left: 0px;">
                      <div class="col-sm-8">
                        <button style="margin-left: 10px; margin-top: 10px; height: 33px;" class="btn btn-secondary" v-for="(ke,index) of keypoint">{{ke}}</button>
                      </div>
                  </div>
              </div>
              <div v-else-if="field.id === 'scientificarea'">
                  <select class="form-control input-lg selectstile" v-model="field.value.value"  @change="handleChange" id="exampleFormControlSelect1">
                      <option hidden selected>Select scientific area</option>
                      <option v-for="(sc,index) of scientificareas"  :value="sc.name" :data-foo="sc.id">{{sc.name}} </option>
                  </select>
              </div>
              <div v-else-if="field.id === 'titlelabor'">
                  <input class="inputstil" type="text" v-model="field.value.value">
              </div>
              <div v-else-if="field.id === 'abstract'">
                  <input class="inputstil" type="text" v-model="field.value.value">
              </div>
              <div v-else-if="field.id === 'coauthors'">
                  <input class="inputstil" type="text" v-model="field.value.value">
              </div>
              <div v-else>
                  <input class="inputstil" type="text" v-model="field.value.value">
              </div>
            </div>
           </div>
           <button class="btn btn-primary buttonstil" v-on:click="addL()">Submit</button>
        </div>
      </div>
  </div>

</template>

<script lang="js">
import http from "../../router/http-common";
  export default  {
    name: 'addlabor-task',
    props: [],
    mounted() {
      
      this.getFields();
      this.getscientificArea(localStorage.getItem('trenutniTaskId'));
    },
    data() {
      return {
        formFields: [],
        file: '',
        keypoint: [],
        keypointString: '',
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



      handleFileUpload(event){
        
       
        this.file = event.target.files[0];
      },

      addL(){
      var v = document.getElementById('file').value;
     /* var data = {
        scientificareaid: this.newLabor.scientificareaid,
        magazineid: this.idmag,
        laborname: this.newLabor.laborname,
        abstractt: this.newLabor.abstractt,
        keyterms: this.keypoint,
        pdfname: v
      }
      */
      for(var i=0;i<this.keypoint.length; i++){
          if(i == this.keypoint.length - 1) {
					this.keypointString = this.keypointString + this.keypoint[i];
				}
				else {
					this.keypointString = this.keypointString + this.keypoint[i] + ",";
				}
      }
      var data = [];
      for(var i=0;i<this.formFields.length;i++){
        var field = {};
        if(this.formFields[i].id != 'keyterms'){
          field = {
            name : this.formFields[i].id,
            value : this.formFields[i].value.value
          }
        }
        else{
          field = {
            name : this.formFields[i].id,
            value : this.keypointString
          }
        }      
        data.push(field);
      }
      http
        //ovo zakomentarisano se koristi kada hoc da dodam u elasticsearch
        //.post("/elasticsearch/addlabores", data, {
          .post("/labor/addnewlabor/" + localStorage.getItem('trenutniTaskId'), data, {
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
          this.keypointString = [];

          for(var k=0;k<this.formFields.length;k++){
            this.formFields[k].value = '';
          }

          //DODAVANJE PDF-a
          let formData = new FormData();
          formData.append('file', this.file);
          http
            .post("/labor/addpdfinlabor/" + xresponse.data + "/" + localStorage.getItem('trenutniTaskId'), formData,{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
          })
          .then(response =>{
            alert("Task completed");
            window.location.href = "http://localhost:8081/#/dashboard/mytasks";
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

      getFields(){
        http
          .get('/task/getform/' + localStorage.getItem("trenutniTaskId"),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get("token")
            }
          })
          .then(response =>{
            this.formFields = response.data.fields;
          })
          .catch(e =>{
            console.log(e);
          })
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
      },

      handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.newLabor.scientificareaid = e.target.options[e.target.options.selectedIndex].dataset.foo
        }
      }





    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .addlabor-task {

  }
  .cardstil{
    margin-top: 85px;
    margin-bottom: 40px;
    width: 900px;
    margin-left: 130px; 
  }
  .labelstil{
    margin-top: 25px;
    margin-left: 25px;
    font-size: 20px;
  }
  .inputstil{
    margin-top: 25px;
    margin-left: 25px;
    width: 400px;
  }
  .buttonstil{
    margin-left: 630px;
    margin-top: 75px;
  }
  .kyetermstil{
    width: 300px; 
    margin-top: 25px;
    margin-left: 25px;
  }
  .selectstile{
    margin-top: 25px;
    margin-left: 25px;
    width: 400px;
  }

</style>
