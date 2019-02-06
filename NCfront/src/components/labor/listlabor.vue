<template lang="html">

  <div>



    <div style="margin-top: 60px;">
        <ul class="list-group" style="margin-left: 10px; margin-right: 18px;">
            <li class="list-group-item " style="padding: 10px 10px;" v-for="(lab,index) of labors">{{lab.title}}
              <div class="row">
                <div class="col-sm-12">
                  <button class="btn btn-primary" v-on:click="payment(lab.id,'labor')" style="padding: 0px 7px;">{{lab.pricelabor}} EUR</button>
                  
                </div>
              </div>
            </li>
          </ul>
    </div>




    



  </div>

</template>

<script lang="js">

import http from "../../router/http-common";

  export default  {
    name: 'listlabor',
    props: ['idmag'],
    mounted() {

      this.$watch('idmag', idmag => {
      this.calllabors()
      }, {immediate:true})


      this.calllabors();
    },
    data() {
      return {
        labors: []
      }
    },
    methods: {

      

      calllabors(){
        http
          .get("/labor/laborsofmagazin/" + this.idmag, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            this.labors = response.data;
        
          })
          .catch(e=> {
            console.log(e);
          })
      },

      payment(labid,type){
        console.log(this.idmag);
        http
          .get("/paymentobject/createpaymentobject/" + labid + "/" + type, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            console.log(response.data);
            window.location.href = response.data; 
            

    
          
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
  .listlabor {

  }
</style>
