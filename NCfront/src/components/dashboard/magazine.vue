<template lang="html">

<div class="magazine">
  <div class="split left">
    <h2 align="center">Magazines</h2>
    <div class="" style="margin-left: 19px;">
        <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Title</th>
                <th scope="col">ISSN</th>
                <th scope="col">Chif editor</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mag,index) of magazines">
                <!--<th scope="row">1</th>-->
                <td>{{index+1}}</td>
                <td>{{mag.name}}</td>
                <td>{{mag.issnnumber}}</td>
                <td>{{mag.chifeditor}}</td>
                <td>
                  <div v-if="mag.type === 'noopenaccess'">
                    <!--moram jos da proverim da li ima clanarinu za taj mag ili ne-->
                    <div v-if="mag.activemembership === 'novalidmembershipf'">
                        <button class="btn btn-light" style="padding: 1px 7px;"  v-on:click="payment(mag.id,'magazine')">
                            {{mag.amountmag}} EUR
                          </button>
                    </div>
                    <div v-else>
                        <a :href="mag.urldownload"  target='_blank'>Download</a>
                    </div>
                  
                  </div>
                  <div v-else>
                      <a :href="mag.urldownload"  target='_blank'>Download</a>
                  </div>
                </td>
                <td><button class="btn btn-light" style="padding: 1px 7px;"  v-on:click="laborsli(mag.id)">Labors</button> </td>
                <td >
                  <div v-if="mag.userrole === 'AUTHOR'">                    
                          <img v-on:click="addlabor(mag.id,mag.type,mag.activemembership)"  src="../../assets/plus-math.png" title="Add labor" width="20px" height="20px" alt="Add labor" >
                  </div>
                </td> 
              </tr>
            </tbody>
          </table>
    </div>
  </div>

  <div class="split right">
      
    <div v-if="showw === true">
       <addlabor></addlabor>
    </div>
    <div v-if="showw2 === true">
        <p class="poruka">Membership fee is invalid! <br> Do you want to pay?</p>
        <button v-on:click="payment(0,'membershipfee')" style="margin-left: 400px;" type="button" class="btn btn-secondary">Pay</button>
    </div>
    <div v-if="show3 === true">
      <listlabor :idmag="idmagazina"></listlabor>
    </div>
    
  </div>
</div>

</template>

<script lang="js">

import http from "../../router/http-common";
import addlabor from "../labor/addlabor"; 
import listlabor from "../labor/listlabor";

  export default  {
    name: 'magazine',
    components: {
      addlabor,
      listlabor
    },
    props: [],
    mounted() {
      
    },
    data() {
      return {
        magazines: [],
        showw: false,
        showw2: false,
        show3: false,
    
        idmagazina: null
      }
    },
    methods: {
    

      laborsli(id){
        
        this.idmagazina = id,
        this.show3 = true,
        this.showw = false,
        this.showw2 = false
      },




      payment(id,type){

        alert("Do you want to buy?");

        if(type == "magazine"){
          this.idmagazina = id;
        }
        
        http
          .get("/paymentobject/createpaymentobject/" + this.idmagazina + "/" + type, {
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

      },

      addlabor(id,type,activemembershipfee){
        this.idmagazina = id;
        if(type == 'openaccess'){
          if(activemembershipfee == 'validmembershipf'){
            this.show3 = false;
            this.showw2 = false;
            this.showw = true;
          }
          else{
            this.showw = false;
            this.show3 = false;
            this.showw2 = true;
          }
          
        }else{
          this.show3 = false;
          this.showw2 = false;
          this.showw = true;

        }


       /*this.show3 = false;
       
        http
          .get("/magazine/checkmembershipfee/" + id, {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response =>{
           if(response.data == "membershipfeetrue"){
             this.showw = true;
           }
           else if(response.data == "noopenaccess"){
            this.showw = true;
           }
           else if(response.data == "membershipfeeinvalid"){
            this.showw2 = true;
           }
           else{
             this.showw2 = true;
           }
          })
          .catch(e => {
            console.log(e);
          });*/
      },

      getUnits: function() {
        
        http
          .get("/magazine/listofmagazines", {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.magazines = response.data;
          })
          .catch(e => {
            console.log(e);
          });

      }
    },
    beforeMount(){
      this.getUnits()
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">

.split{
  height: 100%;
  
  position: fixed;
  z-index: 1;
  top: 56px;
  overflow-x: hidden;
  padding-top: 20px;
}

.left{
  
  width: 50%;
  left: 0;
}

.right {
  
  width: 50%;
  right: 0;
}

.poruka{
  font-size: 35px;
  margin-left: 50px;
  margin-top: 50px;
}

</style>
