<template>
  <div class="container-fluid">
      <h4>Lab Sort Demo</h4>
      <div>You are trying to organize a chemical lab that got terribly jumbled! The bottles and jars and gas cylinders have become separated from part or all of their label, and you need to decide which of the loose label pieces and containers go together.</div>
        <div class="row">
            <div class="col-6">
                <LabSortMatch :index='revIndex' :level='revLevel' :isRev="true" v-if="showRev" v-on:submitQuestion="updateRefListRev"/>
                <LabSortMatch  :index='index' :level='level' :isRev="false" v-on:submitQuestion='updateRefList'/>  
            </div>
            <LabSortRef class="col-6" :refList='refList' :revActive='showRev' v-on:reviewChoice='showRevComponent'/>
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
import LabSortMatch from './LabSortMatch.vue'
import LabSortRef from './LabSortRef.vue'
import Vue from 'vue'


export default {
  components: { 
    LabSortMatch,
    LabSortRef
  },
  data: function() {
    return {
      level: 0,
      index: 0,
      revIndex: 0,
      revLevel: 0,
      showRev: false,
      refListRevIndex: 0,
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
      let answer = [question.headers,question.choices, this.level, this.index, question.correct, question.matcherType]
      this.refList.push(answer)
      this.index++
    },
    updateRefListRev: function(question) {
        if (question) {
            let answer = [question.headers,question.choices, this.level, this.index, question.correct, question.matcherType]
            Vue.set(this.refList, this.refListRevIndex, answer)
        }
        this.showRev = false
    },
    showRevComponent: function(index) {
        let item = this.refList[index]
        this.revIndex = item[3]
        this.revLevel = item[2]
        this.showRev = true
    }
  },
}
</script>
