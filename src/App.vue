<template>
  <div id="app">
    <LewisTester v-bind:bboxes = "bboxes"/>
    <svg class="Lewis-Box-Sizes" width="20" height="20">
    <text v-for="element in elements" :key="key" :id="'atomForBox' + element[0]" :x="0" :y="0" font-family="Verdana"
      font-size="24">{{element[0]}}</text>
  </svg>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import LewisTester from './components/LewisTester.vue'
//import LewisAtom from './components/LewisAtom.vue'
import _ from 'lodash'
import {LewisElements} from './LewisData.js'


export default {
  name: 'app',
  components: {
    LewisTester
  },
  data: function() {
    return {
      bboxes: [1],
      elements: LewisElements
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
      console.log("done mounting App, boxArray is ", boxArray)
      this.bboxes = boxArray
      console.log(this.bboxes)
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
