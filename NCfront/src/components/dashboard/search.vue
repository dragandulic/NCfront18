<template lang="html">

  <div>
    <div class="row">
      <div class="col-sm-4">
        <div class="row" style="margin-top: 40px; margin-left: 20px;" >
          <div class="col-sm-8">
              <input v-model="searchObj.laborname" style="width: 300px;" class="form-control" type="text" placeholder="Labor name" aria-label="Search">
          </div>
          <div class="col-sm-1">
              <i style="font-size:25px; margin-top: 5px;" class="fa fa-search" v-on:click="searchLaborName()"></i>
          </div>
        </div>
          
        <div class="row" style="margin-top: 40px; margin-left: 20px;" >
            <div class="col-sm-8">
                <input v-model="searchObj.magazinename" style="width: 300px;" class="form-control" type="text" placeholder="Magazine name" aria-label="Search">
            </div>
            <div class="col-sm-1">
                <i style="font-size:25px; margin-top: 5px;" class="fa fa-search" v-on:click="searchMagazineName()"></i>
            </div>
          </div>
        
          <div class="row" style="margin-top: 40px; margin-left: 20px;" >
              <div class="col-sm-8">
                  <input v-model="searchObj.author" style="width: 300px;" class="form-control" type="text" placeholder="Author" aria-label="Search">
              </div>
              <div class="col-sm-1">
                  <i style="font-size:25px; margin-top: 5px;" class="fa fa-search" v-on:click="searchAuthor()"></i>
              </div>
          </div>

          <div class="row" style="margin-top: 40px; margin-left: 20px;" >
              <div class="col-sm-8">
                  <input v-model="searchObj.scientificarea" style="width: 300px;" class="form-control" type="text" placeholder="Scientific area" aria-label="Search">
              </div>
              <div class="col-sm-1">
                  <i style="font-size:25px; margin-top: 5px;" class="fa fa-search" v-on:click="searchScientificArea()"></i>
              </div>
          </div>

          <div class="row" style="margin-top: 40px; margin-left: 20px;" >
              <div class="col-sm-8">
                  <input v-model="searchObj.keyterms" style="width: 300px;" class="form-control" type="text" placeholder="Key terms" aria-label="Search">
              </div>
              <div class="col-sm-1">
                  <i style="font-size:25px; margin-top: 5px;" class="fa fa-search" v-on:click="searchKeyTerms()"></i>
              </div>
          </div>

          <div class="row" style="margin-top: 40px;">
            <div class="col-sm-1"></div>
            <div class="col-sm-2"><button class="btn btn-primary" v-on:click="typ('and')">AND</button></div>
            <div class="col-sm-3"><button class="btn btn-primary" v-on:click="typ('or')">OR</button></div>
            <div class="col-sm-6">
                <button class="btn blue-gradient btn-rounded" v-on:click="searchandor()" >Search</button>
            </div>
          </div>
      </div>
      <div class="col-sm-8">

          <table style="margin-top: 60px;" class="table table-striped">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Magazine name</th>
                  <th scope="col">Labor name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Scientific area</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lab,index) of labors">
                  <td>{{index+1}}</td>
                  <td>{{lab.magazinename}}</td>
                  <td>{{lab.laborname}}</td>
                  <td>{{lab.author}}</td> 
                  <td>{{lab.scientificarea}}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>


      </div>
    </div>
  </div>

</template>

<script lang="js">
import http from "../../router/http-common";

  export default  {
    name: 'search',
    props: [],
    mounted() {

    },
    data() {
      return {
        labors:[],
        notfound: '',
        searchObj: {
          laborname: "",
	        magazinename: "",
	        scientificarea: "",
	        keyterms: "",
	        author: "",
	        andor: "",
        }
      }
    },
    methods: {


    typ(dat){
      this.searchObj.andor = dat;
    },



      searchandor(){
        this.labors = [];
        if(this.searchObj.andor != ''){
          http
          .put("/elasticsearch/searcandor", this.searchObj, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }


      },


        searchKeyTerms(){
        console.log("AAAAAAAAaa " +this.searchObj.keyterms);
        if(this.searchObj.keyterms != ''){

          this.labors = [];
          http
          .get("/elasticsearch/searchkeyterm/" + this.searchObj.keyterms, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }

      },



      searchAuthor(){
        
        if(this.searchObj.author != ''){

          this.labors = [];
          http
          .get("/elasticsearch/searchauthor/" + this.searchObj.author, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }

      },







      searchScientificArea(){
        
        if(this.searchObj.scientificarea != ''){

          this.labors = [];
          http
          .get("/elasticsearch/searchscientificarea/" + this.searchObj.scientificarea, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }

      },




      searchMagazineName(){
        
        if(this.searchObj.magazinename != ''){

          this.labors = [];
          http
          .get("/elasticsearch/searchmagazinename/" + this.searchObj.magazinename, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }

      },




      searchLaborName(){
        
        if(this.searchObj.laborname != ''){

          this.labors = [];
          http
          .get("/elasticsearch/searchlaborname/" + this.searchObj.laborname, {
              headers: {
               Authorization: 'Bearer ' + this.$cookie.get('token')
              }
          })
        .then(xresponse => {
          console.log("AAAAAAAAAAAa " + xresponse.status);
          this.labors = xresponse.data,
          this.searchObj.laborname = '',
          this.searchObj.magazinename = '',
          this.searchObj.scientificarea = '',
          this.searchObj.author = '',
          this.searchObj.keyterms = ''
         })
        .catch(e => {
          alert("Not found");
          console.log(e);
        });
          this.submitted = true;
        }

      },




      searchL(){

        http
          .post("/elasticsearch/searchlabor", this.searchObj, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(xresponse => {
            this.searchObj.laborname = '',
            this.searchObj.magazinename = '',
            this.searchObj.scientificarea = '',
            this.searchObj.author = '',
            this.searchObj.keyterms = ''
          })
          .catch(e => {
            console.log(e);
          });
          this.submitted = true;
      }

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .search {

  }
</style>
