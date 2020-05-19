<template>
  <div class="container-fluid">
      <h4>Lab Sort Demo</h4>
      <div>You are trying to organize a chemical lab that got terribly jumbled! The bottles and jars and gas cylinders have become separated from part or all of their label, and you need to decide which of the loose label pieces and containers go together.</div>
        <div class="row">
            <LabSortMatch class="col-7" :index='index' :level='level' v-on:submitQuestion='updateRefList'/>  
            <LabSortRef class="col-5" :refList='refList'/>
        </div>
    </div>
</template>

<style>
th {
  border: 1px solid black;
}
table {
  border-collapse: separate !important;
  border-spacing: 10px;
}
</style>

<script>

//import _ from 'lodash'
//import {LewisHomo, LewisHetero, LewisMulti, LewisTriCentral, LewisIons, LewisElements} from '../LewisData.js'
//import LabSortCompounds from '../LabSortData.js'
//import LabSortSequence from '../LabSortSequence.js'
import LabSortMatch from './LabSortMatch.vue'
import LabSortRef from './LabSortRef.vue'
//import Vue from 'vue'


export default {
  components: { 
    LabSortMatch,
    LabSortRef
  },
  data: function() {
    return {
      level: 0,
      index: 0,
      refList: [] // stores answers, when move to new level push new empty array
    }
  },
  //props: ['questionTypeID'],
  computed: {
    
  },
  methods: {

    updateRefList: function(question) {
      //need to make this system smarter
      // deal with inconsistencies?
      // order usefully, including duplicates
      // assess mastery to time level progression
      let answer = [question.headers,question.choices, this.level, this.index, question.correct]
      this.refList.push(answer)
      this.index++
    }


  },
}
</script>
