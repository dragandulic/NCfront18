<template lang="html">

  <div>
    <h1 style="margin-left: 500px;margin-top: 20px;">My transaction</h1>
    <div class="row" style="height: 700px;">
      <div class="col-sm-2" ></div>
      <div class="col-sm-7" >
          <table class="table table-striped" style="margin-top: 50px;">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
               
              </tbody>
            </table>


      </div>
      <div class="col-sm-3" ></div>
    </div>



  </div>

</template>

<script lang="js">
  export default  {
    name: 'transaction',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .transaction {

  }
</style>
