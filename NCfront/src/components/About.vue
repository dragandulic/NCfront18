<template lang="html">

    <div class="about">
        <h1>This is an about page</h1>
      
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali...</p>
   
        <h1>Hello {{ their_name }}, this is an about page</h1>
        <p>111111</p>
    </div>

</template>

<script lang="js">
  export default  {
    name: 'about',
    props: [],
    mounted() {

    },
    data() {
      return {
        their_name: this.$route.params.name
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
 
</style>
