<template lang="html">

  <div class="container">
    <div class="card cardstil">
      <div class="card-body">
        <h3 align="center">Fix errors and upload pdf</h3>
        <div class="row" style="margin-top: 40px;">
          <div class="col-sm-6">
            <label style="font-size: 20px;">Comments from reviewers:</label>
            <div class="row" v-for="com in authorComments" style="margin-top: 0px;">
                <div class="col-sm-12">
                  <textarea disabled cols="70" rows="2">{{com.comment}}</textarea>    
                </div>
            </div>
          </div>
          <div class="col-sm-6">
              <label style="margin-top: 1px; font-size: 20px;">Write the answer</label>
              <div class="row">
                <div class="col-sm-12">
                  <textarea cols="70" rows="3" v-model="answer"></textarea>
                </div>
              </div>
          </div>
        </div>
        <div class="row" style="margin-top: 40px; ">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"  >
          </div>
          <div class="col-sm-3">
            <button class="btn btn-primary" v-on:click="submitdata()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from '../../router/http-common'
  export default  {
    name: 'fixanduploadlabor',
    props: [],
    mounted() {
      this.getData();
    },
    data() {
      return {
        authorComments: [],
        answer: '',
        file: ''
      }
    },
    methods: {


      submitdata(){

        http
        .get('/task/authoranswer/' + localStorage.getItem('trenutniTaskId') + '/' + this.answer,{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          this.uploadpdf();
          
        })
        .catch(e => {
          console.log(e);
        })

      },


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
            alert("Task complete");
            window.location.href = "http://localhost:8081/#/dashboard/mytasks";
          })
          .catch(e=> {
              console.log(e);
          })

      },

      handleFileUpload(event){
        this.file = event.target.files[0];
      },


      getData(){

        http
          .get('/task/getcommentforauthor/' + localStorage.getItem('trenutniTaskId'),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.authorComments = response.data;
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
  .fixanduploadlabor {

  }
  .cardstil{
    margin-top: 49px;
  }
  .colone{
    border-style: solid; 
    border-width: 1px;
    border-color: rgb(0, 4, 255);
  }
</style>
