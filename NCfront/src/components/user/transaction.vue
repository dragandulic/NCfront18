<template lang="html">

  <div>
    <h1 style="margin-left: 500px;margin-top: 20px;">My transaction</h1>
    <div class="row" style="height: 700px;">
      <div class="col-sm-1" ></div>
      <div class="col-sm-8" >
          <table class="table table-striped" style="margin-top: 50px;">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Merchant</th>
                  <th scope="col">Title</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="(trans,index) of transactionlist">
                  <th scope="row">{{index+1}}</th>
                  <td>{{trans.merchantmail}}</td>
                  <td>{{trans.title}}</td>
                  <td>{{trans.amount}} {{trans.currency}}</td>
                  <td>{{trans.date}}</td>
                  <td>{{trans.type}}</td>
                  
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
    name: 'transaction',
    props: [],
    mounted() {
      this.mytransaction();
    },
    data() {
      return {
        transactionlist: []
      }
    },
    methods: {

      mytransaction: function() {
        
        http
          .get("/paymentobject/mytransaction", {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.transactionlist = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      }




    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .transaction {

  }
</style>
