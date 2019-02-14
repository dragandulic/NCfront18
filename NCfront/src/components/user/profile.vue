<template lang="html">

  <div>

    
    <div class="split left">
      <div v-if="loggedrole === 'show'">
          <div class="row" >
              <div class="col-sm-12">
                  <button style="width: 200px;"  @click='membershipf = !membershipf' v-on:click="prikaz1()" class="btn btn-outline-primary my-2 my-sm-0">
                    <div ><i style="font-size:30px;" class="fa fa-credit-card"></i></div>
                    Membership fee
                  </button>
              </div>
            </div>

          <div class="row" style="margin-top: 1px;" >
            <div class="col-sm-12">
                <button style="width: 200px;" @click='transac = !transac' v-on:click="prikaz2()" class="btn btn-outline-primary my-2 my-sm-0">
                  <div ><i style="font-size:30px;" class="fa fa-money"></i></div>
                  Transaction
                </button>
            </div>
          </div>

          <div class="row" style="margin-top: 1px;" >
            <div class="col-sm-12">
                <button style="width: 200px;" @click='props = !props' v-on:click="prikaz3()" class="btn btn-outline-primary my-2 my-sm-0">
                  <div ><i style="font-size:30px;" class="fa fa-cart-arrow-down"></i></div>
                  Purchased props
                </button>
            </div>
          </div>
        </div>
      </div>

      <div class="split right">
        <div v-if="loggedrole === 'show'" v-show='transac'><transaction></transaction></div>
        <div v-if="loggedrole === 'show'" v-show='membershipf'><membershipfee></membershipfee></div>
        <div v-if="loggedrole === 'show'" v-show='props'><purchasedprops></purchasedprops></div>
      </div>
      

  </div>

</template>

<script lang="js">
import http from "../../router/http-common";
import transaction from "../user/transaction"; 
import membershipfee from "../user/membershipfee"; 
import purchasedprops from "../user/purchasedprops";

  export default  {
    name: 'profile',
    components: {
      transaction,
      membershipfee,
      purchasedprops
    },
    props: [],
    mounted() {
      this.howislogged();
    },
    data() {
      return {
        transac: false,
        membershipf: false,
        props: false,
        loggedrole: "",
      }
    },
    methods: {
      prikaz1(){
        this.transac = false;
        this.props = false;
      },
      prikaz2(){
        this.membershipf = false;
        this.props = false;
      },
      prikaz3(){
        this.transac = false;
        this.membershipf = false;
      },

      howislogged(){
        http
          .get("/editoreviewer/whoislogged", {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
            if(response.data == 'EDITOR'){
              console.log("bbbbbbbbbb "+ response.data);
              this.loggedrole = "dontshow";
            }
            else{
              console.log("aaaaaaaaaaa "+ response.data);
              this.loggedrole = "show";
            }
               
                    
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
  .profile {

  }

  .split{
  height: 100%;
  
  
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  top: 56px;
  
  padding-top: 20px;
}

.left{
 
  width: 12%;
  left: 0;
}

.right {
  
  width: 88%;
  right: 0;
}
</style>
