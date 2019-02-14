<template lang="html">

  <div>



    <div style="margin-top: 60px;">
        <ul class="list-group" style="margin-left: 10px; margin-right: 18px;">
            <li class="list-group-item " style="padding: 10px 10px;" v-for="(lab,index) of labors">{{lab.title}}
              <div class="row" style="height: 28px;">
                <div class="col-sm-12">
                  <div v-if="lab.role === 'EDITOR'">
                      <a style="font-size: 19px;" :href="lab.urldownload"  target='_blank'>Download</a> 
                  </div>
                  <div v-else>
                  <div v-if="lab.magazintype === 'noopenaccess'">
                    <div v-if="lab.activemembership === 'validmembershipf'">
                        <a style="font-size: 19px;" :href="lab.urldownload"  target='_blank'>Download</a> 
                    </div>
                    <div v-else>
                      <div v-if="lab.bought === 'yesbought'">
                          <a style="font-size: 19px;" :href="lab.urldownload"  target='_blank'>Download</a>
                      </div>
                      <div v-else>
                          <button class="btn btn-primary" v-on:click="payment(lab.id,'labor')" style="padding: 0px 7px;">{{lab.pricelabor}} EUR</button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                      <a style="font-size: 19px;" :href="lab.urldownload"  target='_blank'>Download</a> 
                  </div>
                </div>
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
