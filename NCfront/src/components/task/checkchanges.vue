<template lang="html">

    <div class="container">
        <div class="card cardstil">
          <div class="card-body">
            <h3 align="center">Overview labor</h3>
            <div class="row rowstil">
              <div class="col-sm-12">
                  <a :href="urldownloadpdf"  target='_blank'>Download PDF</a>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                  <label style="font-size: 20px; margin-top: 30px;">Comments of reviewers:</label>
                  <div class="row" v-for="com in comments.reviewercomment" style="margin-top: 10px;">
                      <div class="col-sm-12">
                        <textarea disabled cols="70" rows="2">{{com}}</textarea>    
                      </div>
                  </div>
                  <label style="font-size: 20px; margin-top: 40px;">Answer of author:</label>
                  <div class="row" style="margin-top: 10px;">
                      <div class="col-sm-12">
                        <textarea disabled cols="70" rows="2">{{comments.authoranswer}}</textarea>    
                      </div>
                  </div>
              </div>
              <div class="col-sm-6">
                <div class="row" style="margin-top: 65px;">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-9">
                    <label>Title of labor:</label>
                    <input disabled type="text" v-model="comments.title">
                  </div>
                </div>
                <div class="row" >
                    <div class="col-sm-3"></div>
                    <div class="col-sm-9">
                      <label>Abstract:</label>
                      <input disabled type="text" v-model="comments.apstract" style="margin-left: 31px;">
                    </div>
                </div>
                <div class="row">
                      <div class="col-sm-3"></div>
                      <div class="col-sm-9">
                        <label>Key terms:</label>
                        <input disabled type="text" v-model="comments.keyterms" style="margin-left: 20px;">
                      </div>
                </div>
                <div class="row" style="margin-top: 40px;">
                  <div class="col-sm-3"></div>
                  <div class="col-sm-9">
                      <form>
                          <input type="radio" v-model="odluka"  name="gender" value="PRIHVATI">Accept <br>
                          <input type="radio" v-model="odluka" style="margin-top: 15px;" name="gender" value="POPRAVI LABOR">Fix labor <br>
                        </form>
                  </div>
                </div>
                <div class="row" style="margin-top: 40px;">
                <div class="col-sm-7"></div>
                <div class="col-sm-5">
                    <button class="btn btn-primary" v-on:click="submitData()">Submit</button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script lang="js">
import http from '../../router/http-common'
  export default  {
    name: 'checkchanges',
    props: [],
    mounted() {
      this.getPDFurl();
      this.getComments();
    },
    data() {
      return {
        urldownloadpdf: '',
        comments: '',
        odluka: ''
      }
    },
    methods: {

      submitData(){

      http
        .get('/task/completecheckchanges/' + localStorage.getItem('trenutniTaskId') +'/' + this.odluka,{
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

      },

      getComments(){

      http
        .get('/task/checkchanges/' + localStorage.getItem('trenutniTaskId'),{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          this.comments = response.data;
        })
        .catch(e => {
          console.log(e);
        })
      },

    getPDFurl(){

      http
        .get('/task/reviewpdf/' + localStorage.getItem('trenutniTaskId'),{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          this.urldownloadpdf = response.data;
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
  .checkchanges {

  }
  .cardstil{
    margin-top: 50px;
  }
  .rowstil{
    margin-top: 40px;
    margin-left: 40px;
  }
</style>
