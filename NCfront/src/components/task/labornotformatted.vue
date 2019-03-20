<template lang="html">

  <div class="container">
    <div class="card" style="margin-top: 60px;">
      <div class="card-body">
        <h3 align="center" style="margin-bottom: 40px;">Update labor</h3>
        <div class="row" v-for="field in formFields" style="margin-top: 15px; margin-left: 15px;">
          <div  class="col-sm-4">
            <label v-if="field.name === 'titleLabor'">Title of labor</label>
            <label v-else-if="field.name === 'coauthors'">Coauthors</label>
            <label v-else-if="field.name === 'keyterms'">Key terms</label>
            <label v-else-if="field.name === 'scientificarea'">Scientific area</label>
            <label v-else-if="field.name === 'apstract'">Abstract</label>
            <label v-else-if="field.name === 'pdf'">PDF</label>
            <label v-else-if="field.name === 'komentarurednika'">Comment</label>
          </div>
          <div class="col-sm-8">
            <textarea disabled v-if="field.name === 'komentarurednika'" :value="field.value" cols="60" rows="2"></textarea>
            <input v-else-if="field.name === 'pdf'" type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"  >
            <input disabled v-else type="text" :value="field.value" style="width: 446px;">
          </div>
        </div>
        <div>
          <button class="btn btn-primary" v-on:click="uploadpdf()">Upload</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from '../../router/http-common'

  export default  {
    name: 'labornotformatted',
    props: [],
    mounted() {
      this.getFields();
    },
    data() {
      return {
        file: '',
        formFields: []
      }
    },
    methods: {


      uploadpdf(){
        let formData = new FormData();
        formData.append('file', this.file);

          http
            .post("/labor/uploadpdf/" + localStorage.getItem('trenutniTaskId'), formData,{
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

      },

      handleFileUpload(event){
        this.file = event.target.files[0];
      },

      getFields(){
        http
          .get('/task/labornotformatted/' + localStorage.getItem("trenutniTaskId"),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get("token")
            }
          })
          .then(response =>{
            this.formFields = response.data;
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
  .labornotformatted {

  }
</style>
