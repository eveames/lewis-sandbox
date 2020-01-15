<template>
  <div class="panel panel-default">
        <div class="panel-body">
            <br>
            <svg width="200" height="200">
              <lewis-atom :stats='stats'></lewis-atom>
            </svg>
            <br>
    </div>
</div>
</template>
<style>
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data: function() {
    return {
    }
  },
  props: ['formula', 'maxErrors', 'maxBonds', 'alterationInstructions'],
  computed: {
    ...mapGetters({
      elements: 'getLSE'
    }),
    question: function() {
      return Vue.generalLewisStructure(this.formula, this.elements, this.maxBonds, this.alterationInstructions,this.maxErrors)
    },
    stats: function() {
      let directions = Array(12);
      directions.fill(0);
      let drawnAtoms = Array(this.question.structure.length);
      drawnAtoms.fill(0);
      return {
        center: [100,100],
        directions: directions,
        atomsArray: this.question.structure,
        drawnAtoms: drawnAtoms,
        index: 0,
      }
    }
  },

  methods: {
  }
}
</script>
