<template>
    <div class="card">
        <h4 class="card-title">Lab Sort!</h4>
        <div class="card-body">
            <table class="">
                <tr>
                    <th v-for="(header, index) in question.headers" :key="index"> 
                        <LabSortLabel :header="header" :matcherType="question.matcherType" :choice="question.choices[index]"/>
                    </th>
                </tr>
                <tr v-for="m in question.matchers.length" :key="m">
                    <td v-for="h in question.headers.length" :key="h">
                        <button @click="makeChoice(m,h)" class="btn" v-bind:class="btnClasses[m-1][h-1]">
                        {{question.matchers[m-1]}}
                        </button>
                    </td>
                </tr>
            </table>
            <button @click="reset()" class="btn">
                Reset
            </button>
            <button v-show="readyToSubmit && !(isRev)" @click="submit()" class="btn">
                Next
            </button>
            <button v-show="isRev && readyToSubmit" @click="submit()" class="btn">
                Update
            </button>
            <button v-show="isRev && !(readyToSubmit)" @click="cancel()" class="btn">
                Cancel
            </button>
        </div>
    </div>
</template>

<style>

</style>

<script>

import _ from 'lodash'
import {LabSortCompounds} from '../LabSortData.js'
import {LabSortSequence} from '../LabSortSequence.js'
import LabSortLabel from './LabSortLabel.vue'
import Vue from 'vue'


export default {
  components: { 
    LabSortLabel
  },
  props: [
      'index',
      'level',
      'isRev' 
      ],
  data: function() {
    return {
      //entry: '',
      readyToSubmit: false,
      question: {
        headers: ["Cd", "Ca", "C"],
        matchers: ["calcium", "cadmium", "chlorine", "carbon", "copper"],
        choices: ["","",""],
        usedMatchers: [-1,-1,-1,-1,-1],
        btnInit: [["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"]]
      },
      btnClasses: [["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"],
            ["btn-primary", "btn-primary","btn-primary"]],
    }
  },
  watch: {
    index: function() {
      this.setQuestion()
      //this.updateBtnClasses()
    }
  },
  mounted: function() {
    this.setQuestion()
  },
  /*beforeUpdate: function() {
      this.updateBtnClasses(this.question.btnInit)  
  },*/
  methods: {
    setQuestion: function() {
        console.log("recomputing question")
      //console.log(LabSortSequence[0][0])
      let seqItem = LabSortSequence[this.level][this.index]
      //console.log(seqItem)
      // headers: items to match to (top)
      // matchers: items on buttons

      // 1: header data (which properties we are matching to, for example, appearance and formula, or name); specify with digit or string?
    // 2: [keys of items in data object to include in header]
    // 3: match data (which property we match to header) 
    // 4: additional distractor items as match possibilities: [keys]
      
      // headers: array of objects, each object has keys matching seqItem[1]
      let headers = []
      let matchers = []
      let answers = []
      let data = []
      for (let i = 0; i < seqItem[2].length; i++) {
          let header = {0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false}
          data = LabSortCompounds[seqItem[2][i]]
          for (let k = 0; k < seqItem[1].length; k++) {
              Vue.set(header, seqItem[1][k], data[seqItem[1][k]])
          }
          headers.push(header)
          matchers.push(data[seqItem[3]])
          answers.push(data[seqItem[3]])
      }
      if (seqItem[4]) {
         for (let i = 0; i < seqItem[4].length; i++) {
          data = LabSortCompounds[seqItem[4][i]]
          matchers.push(data[seqItem[3]])
        } 
      }
      //console.log("before shuffle", matchers)
      matchers = _.shuffle(matchers)
      //console.log("after shuffle", matchers)
      let choices = Array(headers.length).fill("")
      let usedMatchers = Array(matchers.length).fill(-1)
      let btnInit = Array(matchers.length).fill(Array(headers.length).fill("btn-primary"))
      this.btnClasses = this.updateBtnClasses(btnInit, usedMatchers)
      this.question = {
          headers: headers,
          matchers: matchers,
          matcherType: seqItem[3],
          choices: choices,
          usedMatchers: usedMatchers,
          btnInit: btnInit,
          answers: answers,
          correct: 0
      }
    },
    makeChoice: function(m, h) {
        m -= 1
        h -= 1
        //check if matcher has been used, and if so, move it
        //test: m = 0, h = 1
        if (this.question.usedMatchers[m] >=0) {
            Vue.set(this.question.choices, [this.question.usedMatchers[m]], '')
        } 
        if (this.question.choices[h]) {
            let currentChoice = this.question.usedMatchers.indexOf(h)
            Vue.set(this.question.usedMatchers, currentChoice, -1)
        }
        Vue.set(this.question.choices, h, this.question.matchers[m])
        this.question.usedMatchers[m] = h
        this.btnClasses = this.updateBtnClasses(this.question.btnInit, this.question.usedMatchers)
        if (this.question.choices.indexOf('') === -1) {
            this.readyToSubmit = true
        }
    },
    reset: function() {
        this.question.choices = Array(this.question.headers.length).fill("")
        this.question.usedMatchers = Array(this.question.matchers.length).fill(-1)
        this.btnClasses = this.updateBtnClasses(this.question.btnInit, this.question.usedMatchers)
    },
    submit: function() {
        // set up distractor items for reflist
        let difLength = this.question.matchers.length - this.question.headers.length
        if (difLength > 0) {
            this.question.headers.push(["unmatched"])
            let index = 0
            let unmatch = ''
            for (let i = 0; i < difLength; i++) {
                if (i >0) unmatch += ", "
                index = this.question.usedMatchers.indexOf(-1, index)
                unmatch += this.question.matchers[index]
                index +=1
            }
            this.question.choices.push(unmatch)
        }
        // check if correct
        for (let i = 0; i < this.question.answers.length; i++) {
            if (this.question.answers[i] === this.question.choices[i]) {
                this.question.correct++
            }
        }
        this.question.correct = _.round(this.question.correct/this.question.headers.length, 2)
        this.$emit("submitQuestion", this.question)
        console.log("finished submit")
    },
    cancel: function() {
        this.$emit("submitQuestion", false)
    },
    updateBtnClasses: function(btnInit, usedMatchers) {
        let arr = []
        for (let n = 0; n < btnInit.length; n++) {
            arr[n] = btnInit[n].slice()
        }
        console.log("before update")
        //
        for (let m = 0; m < usedMatchers.length; m++) {
            if (usedMatchers[m] >= 0) {
                for (let k = 0; k < arr.length; k++) {
                    Vue.set(arr[k], usedMatchers[m], "btn-info")
                }
                for (let i = 0; i < arr[m].length; i++) {
                    Vue.set(arr[m], i, "btn-info")
                }
                Vue.set(arr[m], usedMatchers[m], "btn-success")
            }
        }
        console.log("updated", arr)
        return arr
    }
  },
}
</script>
