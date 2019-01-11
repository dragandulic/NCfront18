<template>
  <div id="app">
      
     <router-view/>
    
  </div>
</template>


<script>
import Skills from './components/Skills.vue'
import About from './components/About.vue'
import proba from './components/proba.vue'

import Wellcome from './components/wellcome/wellcome.vue'

export default {
  name: 'app',
  components: {
    Wellcome,
    Skills,
    About,
    proba
  }
}
</script>




<style>



</style>
