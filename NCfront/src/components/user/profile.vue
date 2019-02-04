<template lang="html">

  <div>

    
    <div class="split left">
          <div class="row" >
              <div class="col-sm-12">
                  <button style="width: 200px;"  @click='membershipf = !membershipf' v-on:click="prikaz1()" class="btn btn-outline-primary my-2 my-sm-0">
                    <div ><i style="font-size:30px;" class="fa fa-credit-card"></i></div>
                    Membership fee
                  </button>
              </div>
            </div>

          <div class="row"  >
            <div class="col-sm-12">
                <button style="width: 200px;" @click='transac = !transac' v-on:click="prikaz2()" class="btn btn-outline-primary my-2 my-sm-0">
                  <div ><i style="font-size:30px;" class="fa fa-money"></i></div>
                  Transaction
                </button>
            </div>
          </div>
      </div>

      <div class="split right">
        <div v-show='transac'><transaction></transaction></div>
        <div v-show='membershipf'><membershipfee></membershipfee></div>
       
      </div>
      

  </div>

</template>

<script lang="js">

import transaction from "../user/transaction"; 
import membershipfee from "../user/membershipfee"; 

  export default  {
    name: 'profile',
    components: {
      transaction,
      membershipfee
    },
    props: [],
    mounted() {

    },
    data() {
      return {
        transac: false,
        membershipf: false,
      }
    },
    methods: {
      prikaz1(){
        this.transac = false;
      },
      prikaz2(){
        this.membershipf = false;
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
