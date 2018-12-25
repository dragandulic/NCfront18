<template lang="html">

  <div class="addlabor">

    <h2 align="center">Add labor</h2>

    <div class="info">
      <div class="fildovi">
          <label for="exampleFormControltitle1">Title of labor</label>
        <input class="form-control" id="exampleFormControltitle1" type="text" placeholder="Title">
        <br>

        <label for="exampleFormControlTextarea1">Key terms</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

        <label for="exampleFormControlabstract1">Abstrast</label>
        <textarea class="form-control" id="exampleFormControlabstract1" rows="2"></textarea>


      </div>
    </div>

  </div>

</template>

<script lang="js">
  export default  {
    name: 'addlabor',
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
  .addlabor {
    background: dodgerblue;
  }
  .info{
    border:1px solid black;
    margin-left: 15px;
    margin-right: 10px;
  }
  .fildovi{
    padding: 10px;
  }
</style>
