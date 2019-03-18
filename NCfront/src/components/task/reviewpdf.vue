<template lang="html">

  <div class="container">
    <div class="card cardstil">
      <div class="card-body">
        <h3 align="center">Review PDF</h3>
          <div class="row linkstil">
              <div class="col-sm-12"> 
                  <a :href="urldownloadpdf"  target='_blank'>Download PDF</a>
              </div>
           </div>
           <div class="row commentstil">
             <div class="col-sm-12">
               <textarea cols="80" rows="3"></textarea>
             </div>
           </div>
           <div class="row commentstil">
             <div class="col-sm-5"></div>
             <div class="col-sm-2">
               <button class="btn btn-primary">AAAAAAAA</button>
             </div>
             <div class="col-sm-5" style="margin-left: 0px;">
               <button class="btn btn-secondary">BBBBBBBB</button>
             </div>
           </div>
      </div>
    </div>

  </div>
</template>

<script lang="js">
import http from '../../router/http-common'

  export default  {
    name: 'reviewpdf',
    props: [],
    mounted() {

      this.getData();

    },
    data() {
      return {
        urldownloadpdf: ''
      }
    },
    methods: {

      getData(){

        http
          .get('/task/reviewpdf/' + localStorage.getItem('trenutniTaskId'),{
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            console.log("VRATIOOOOOOOO " + response.data) ;
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
  .reviewpdf {

  }
  .linkstil{
    margin-top: 50px;
    
  }
  .cardstil{
    margin-left: 150px; 
    margin-top: 85px;
    width: 800px;
  }
  .commentstil{
    margin-top: 30px;
  }
</style>
