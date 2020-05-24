<template>
  <div class="container-fluid">
      <h4>Welcome to the Chem Lab</h4>
        <LabIntroPassages/>
    </div>
</template>

<style>

</style>

<script>
import LabIntroPassages from './LabIntroPassages.vue'
//import LabSortRef from './LabSortRef.vue'
//import Vue from 'vue'


export default {
  components: { 
    LabIntroPassages,
  },
  data: function() {
    return {
      
    }
  },
  //props: ['questionTypeID'],
  computed: {
  },
  methods: {
      //this component is for switching between units
  }
}
</script>
