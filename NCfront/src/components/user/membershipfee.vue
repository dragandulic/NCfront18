<template lang="html">

 <div>

    <h1 style="margin-left: 370px;margin-top: 20px;">Membership fee</h1>
    <div class="row" style="height: 700px;">
       <div class="col-sm-1" ></div>
       <div class="col-sm-7" >
           <table class="table table-striped" style="margin-top: 20px;">
               <thead>
                 <tr>
                   <th scope="col">#</th>
                   <th scope="col">Start date</th>
                   <th scope="col">End date</th>
                   <th scope="col">Magazin</th>                
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="(membersh,index) of mymembershipfeelist">
                   <th scope="row" v-if="membersh.valid === 'validm'">{{index+1}}</th>
                   <th scope="row" v-else style="background: red">{{index+1}}</th>
                   <td>{{membersh.startdate}}</td>
                   <td>{{membersh.enddate}}</td>
                   <td>{{membersh.magazine}}</td>
                  
                   
                   
                 </tr>
                 
                
               </tbody>
             </table>
   
   
       </div>
       <div class="col-sm-4"  >
         <div style=" height: 150px;">            
          <h4 style="margin-left: 68px; margin-top: 100px;">Pay a membership fee</h4>
          <select style="margin-left: 40px; width: 360px;" class="form-control input-lg" @change="handleChange" id="exampleFormControlSelect1">
              <option hidden selected>Select magazine</option>
              <option v-for="(mag,index) of magazines"  value="index+1" :data-fo1="mag.amountmag" :data-foo="mag.id">{{mag.name}} </option>
            </select>
            <div class="row">
              <div class="col-sm-4"> <p style="margin-left: 50px; margin-top: 15px;">{{pricemembershipfee}}</p></div>
              <div class="col-sm-8">
                  <button style="margin-left: 100px; margin-top: 15px;" v-on:click="buymembershipfee('membershipfee')" class="btn btn-light">Pay</button>
              </div>
          </div>
          </div>
       </div>
     </div>


 </div>

</template>

<script lang="js">
import http from "../../router/http-common";


  export default  {
    name: 'membershipfee',
    props: [],
    mounted() {
      this.getUnits(),
      this.mymembershipfee()
    },
    data() {
      return {
        membershipfees: [],
        magazinemembershipfee: null,
        magazines: [],
        magazinid: null,
        mymembershipfeelist: [],
        pricemembershipfee: null
      }
    },
    methods: {

      idmagazi(id){
        
      },

      buymembershipfee(type){
        if(this.magazinid != null){
          http
          .get("/paymentobject/createpaymentobject/" + this.magazinid + "/" + type, {
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




      handleChange(e) {
        if(e.target.options.selectedIndex > -1) {
            this.magazinid = e.target.options[e.target.options.selectedIndex].dataset.foo;
            this.pricemembershipfee = "Price: " +  e.target.options[e.target.options.selectedIndex].dataset.fo1 + "EUR";
           
        }
      },

      mymembershipfee(){

        http
          .get("/membershipfee/mymembershipfee", {
            headers: {
              Authorization: 'Bearer ' + this.$cookie.get('token')
            }
          })
          .then(response => {
            this.mymembershipfeelist = response.data;
          })
          .catch(e => {
            console.log(e);
          });


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
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .membershipfee {

  }
</style>
