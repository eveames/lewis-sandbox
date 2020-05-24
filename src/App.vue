<template>
  <div id="app">
    <button @click="setApp(1)" class="btn btn-default"
              type="button">Lewis Structures!</button>
    <button @click="setApp(2)" class="btn btn-default"
              type="button">Lab Sort!</button>
    <button @click="setApp(3)" class="btn btn-default"
              type="button">LabIntro</button>
    <LewisTester v-if="whichApp === 1" v-bind:bboxes = "bboxes"/>
    <LabSort v-if="whichApp === 2" />
    <svg class="Lewis-Box-Sizes" width="20" height="20">
    <text v-for="element in elements" :key="key" :id="'atomForBox' + element[0]" :x="0" :y="0" font-family="Verdana"
      font-size="24">{{element[0]}}</text>
  </svg>
  </div>
</template>

<script>
import LewisTester from './components/LewisTester.vue'
import _ from 'lodash'
import {LewisElements} from './LewisData.js'

import LabSort from './components/LabSort.vue'
//import PassageTree from './components/PassageTree.vue'



export default {
  name: 'app',
  components: {
    LewisTester,
    LabSort,
    //PassageTree
  },
  data: function() {
    return {
      bboxes: [1],
      elements: LewisElements,
      whichApp: 2
    }
  },
  mounted () {
      //console.log('starting mounted method ', this.elements)
      let boxArray = {}
      let rect = 0
      let width = 0
      let height = 0
      _.forOwn(LewisElements, (element, key) => {
        //console.log("in forOwn", boxArray)
        rect = document.getElementById('atomForBox' + key).getBBox();
        //console.log(rect)
        width = rect.width;
        height = rect.height;
        boxArray[key] = {width: width, height: height}
      })
      //console.log("done mounting App, boxArray is ", boxArray)
      this.bboxes = boxArray
      //console.log(this.bboxes)
  },
  methods: {
    setApp: function(choice) {
      this.whichApp = choice
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
