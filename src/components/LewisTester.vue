<template>
  <div class="panel panel-default">
      <div class="panel-heading">Lewis Tester</div>

        <div class="panel-body">
          <div>

            <br><br>
            Is this a good Lewis structure for <span v-html="this.$options.filters.formatFormula(formula)"></span>?</div>
            <div class="input-group">
              <span class="input-group-btn">
                <button @click="submitEntry" class="btn btn-default"
                  type="button">Submit answer!</button>
                <input type="text" autocorrect="off" v-model="formulaEntry">
              </span>
            </div>
            <svg width="200" height="200">
              <LewisAtom :bboxes="bboxes" :stats='stats'/>
            </svg>
            matchAll array is {{matchAll}}


            <br>

    </div>
</div>
</template>
<style>
</style>
<script>

//import _ from 'lodash'
import {LewisHomo, LewisHetero, LewisMulti, LewisTriCentral, LewisIons, LewisElements} from '../LewisData.js'
import Vue from 'vue'
import LewisAtom from './LewisAtom.vue'


export default {
  components: { 
    LewisAtom
  },
  props: ['bboxes'],
  data: function() {
    return {
      entry: '',
      index: 1,
      formulaEntry: '',
      userEnteredFormula: 0,
      newFormula: ''
      //determines whether name or formula is given
    }
  },
  //props: ['questionTypeID'],
  computed: {
    formulasArray: function() {
      let temp = LewisHomo.concat(LewisHetero, LewisMulti, LewisTriCentral, LewisIons)
      //let temp = this.lewisTriCentral
      //let temp = this.lewisIons
      return temp
    },
    formula: function() {
      return this.newFormula
      //return 'SCl4'
    },
    question: function() {
      return Vue.parseFormulaForStructure(this.formula, LewisElements)
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
    },
    matchAll: function() {
      let regexp = /([A-Z][a-z]*)(\d*)/g;
      let array = [...this.formula.matchAll(regexp)];
      return array
    }
  },
  mounted: function() {
    console.log(this.bboxes[0])
    this.newFormula = this.formulasArray[this.index]
  },
  methods: {

    submitEntry: function() {
      if (this.formulaEntry) {
        this.userEnteredFormula = 1
        this.newFormula = this.formulaEntry
      }
      else {
        this.index++
        this.newFormula = this.formulasArray[this.index]
      }
      //this.index = 20
    }
  },
}
</script>
