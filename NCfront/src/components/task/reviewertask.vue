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
        <div class="row commentstil">
          <div class="col-sm-12">
              <textarea cols="80" rows="3" placeholder="Comment for author" v-model="komentarAutoru"></textarea>
          </div>
        </div>
        <div class="row commentstil">
            <div class="col-sm-12">
                <textarea cols="80" rows="3" placeholder="Comment for editor" v-model="komentarUredniku"></textarea>
            </div>
        </div>
        <div class="row commentstil">
          <div class="col-sm-12">
            <form>
              <input type="radio" v-model="procena"  name="gender" value="PRIHVATI">ACCEPTABLE <br>
              <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="MANJE IZMENE">ACCEPT WITH SMALL CHANGES <br>
              <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="VECE IZMENE">ACCEPT WITH BIG CHANGES <br>
              <input type="radio" v-model="procena" style="margin-top: 15px;" name="gender" value="ODBITI">DECLINE <br>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <button class="btn btn-primary" v-on:click="submitData()">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from '../../router/http-common'
  export default  {
    name: 'reviewertask',
    props: [],
    mounted() {

      this.getPDFurl();

    },
    data() {
      return {
        urldownloadpdf: '',
        komentarAutoru: '',
        komentarUredniku: '',
        procena: ''
      }
    },
    methods: {

    submitData(){
      var data = {
        commentAuthor : this.komentarAutoru,
        commentEditor : this.komentarUredniku,
        rating : this.procena
      }

      http
        .post('/task/overviewlabor/' + localStorage.getItem('trenutniTaskId'),data,{
          headers: {
            Authorization: 'Bearer ' + this.$cookie.get('token')
          }
        })
        .then(response => {
          alert("Task complete");
          window.location.href = "http://localhost:8081/#/dashboard/mytasks";
        })
        .catch(e=>{
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
  .reviewertask {

  }
  .cardstil{
    margin-top: 50px;
  }
  .rowstil{
    margin-top: 40px;
    margin-left: 40px;
  }
  .commentstil{
    margin-top: 30px;
  }
</style>
