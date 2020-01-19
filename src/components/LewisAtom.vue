<template>
  <g>
    <text :id="'atom' + index" :x="textRect.left" :y="textRect.baseline" font-family="Verdana"
      font-size="24">{{element[0]}}</text>
    <line v-for="bond in toDraw.bonds" :x1='bond.start[0]' :y1='bond.start[1]' :x2='bond.end[0]'
      :y2='bond.end[1]' stroke-width="2" stroke="black"/>
    <circle v-for="dot in toDraw.dots" :cx='dot.position[0]' :cy='dot.position[1]' r="2"/>
    <text v-if="toDraw.formalCharge" :x='toDraw.formalCharge.position[0] - 2' :y='toDraw.formalCharge.position[1] +4'
      font-family="Verdana" font-size="14" font-weight="bold">{{toDraw.formalCharge.charge}}</text>
    <lewis-atom v-for="atom in toDraw.newAtoms" :stats="atom.stats" :bboxes="bboxes" :key="atom.stats.index"></lewis-atom>
  </g>
</template>
<script>
import _ from 'lodash'
import {LewisElements} from '../LewisData.js'
import Vue from 'vue'

export default {
  name: 'lewis-atom',
  data: function() {
    return {
      mounted: false
    }
  },
  props: ['stats', 'bboxes'],
  computed: {
    /*baseRect: function() {
      if (this.mounted) {
        let rect = document.getElementById('atom' + this.index).getBBox();
        console.log('in if')
        let width = rect.width;
        let height = rect.height;
        return {x: rect.x, y: rect.y, width: width, height: height}
        //console.log(this.element, this.baseRect)
      }
      else {
        console.log('in else')
        return {x: 100, y: 100, width: 40, height: 30}
      }
    },*/
    index: function() {
      return this.stats.index;
    },
    atom: function() {
      return this.stats.atomsArray[this.index];
    },
    numUnbondedE: function() {
      return this.atom[1];
    },
    element: function() {
      //console.log(LewisElements, this.atom)
      return LewisElements[this.atom[2]];
    },
    numBonds: function() {
      let numBonds = 0;
      for (let i = 0; i < this.atom[3].length; i++){
        numBonds += this.atom[3][i][1];
      }
      return numBonds;
    },
    numConnections: function() {
      return this.atom[3].length;
    },
    numDomains: function() {
      return this.numConnections + _.ceil(this.numUnbondedE/2)
    },
    formalCharge: function() {
      return this.atom[7];
    },
    directions: function() {
      return this.stats.directions.slice(0);
    },
    drawnAtoms: function() {
      let temp = this.stats.drawnAtoms.slice(0);
      temp[this.index] = 1;
      return temp;
    },
    textRect: function() {
      //console.log("this.bboxes:",this.bboxes['P'])
      let bbox = this.bboxes[this.element[0]]
      //console.log(bbox.width, bbox.height)
      let left = this.stats.center[0] - bbox.width/2
      let top = this.stats.center[1] - bbox.height/2
      let width = bbox.width;
      let height = bbox.height;
      let right = this.stats.center[0] + bbox.width/2
      let bottom = this.stats.center[1] + bbox.height/2
      let centerx = this.stats.center[0];
      let centery = this.stats.center[1];
      let baseline = this.stats.center[1] + bbox.height/4;
      return {left: left, right: right, top: top, bottom: bottom,
        width: width, height: height, centerx: centerx, centery: centery, baseline: baseline}
    },
    numBondsAlready: function() {
      let numBondsAlready =0;
      for (let i =0; i < this.directions.length; i++) {
        numBondsAlready += this.directions[i];
      }
      //if (numBondsAlready > 1) console.log('not setup for cylic molecules')
      return numBondsAlready;
    },
    toDraw: function() {
      let posOccupied = []
      let domains = this.numDomains;
      let posToAdd = []
      let bondsArray = []
      let newAtomsArray = []
      let dotsArray = []
      let formalChargeToDraw = false;
      if (this.stats.org) {
        if (this.numBondsAlready > 0) {
          for (let i =0; i < this.directions.length; i++) {
            if (this.directions[i] == 1) {
              posOccupied.push(i)
            }
          } 
        }
        //console.log("posOccupied is ", posOccupied)
        if (domains == 4) {
          posToAdd = [3,9,0,6]
        }
        else if (domains == 3) {
          posToAdd = [2,10,6]
        }
        else if (domains == 2) {
          posToAdd = [0,6]
        }
        else if (domains == 1) {
          console.log("domains = 1, seems like something weird happened")
        }
        
        if (posOccupied.length > 0) {
          posToAdd = _.difference(posToAdd, posOccupied)
        }
      }
      else {
        let x = _.random(0,11)
        if (this.numBondsAlready === 1) {
         x = this.directions.indexOf(1)
          posOccupied.push(x)
        }
        //if (this.formalCharge !== 0 && domains > 4) domains += 1
        if (domains === 7) posToAdd = [(x+6)%12, (x+2)%12, (x+4)%12, (x+8)%12, (x+10)%12, (x+5)%12, x]
        else if (domains === 6) posToAdd = [(x+6)%12, (x+2)%12, (x+4)%12, (x+8)%12, (x+10)%12,x]
        else if (domains === 5) posToAdd = [(x+5)%12,(x+2)%12, (x+7)%12, (x+10)%12, x]
        else if (domains === 4) posToAdd = [(x+6)%12,(x+3)%12, (x+9)%12, x]
        else if (domains === 3) posToAdd = [(x+4)%12, (x+8)%12, x]
        else if (domains === 2) posToAdd = [(x+6)%12, x]
        else if (domains === 1) posToAdd = [x]
        else console.log("bad number of domains")
      }
      
      //add bond and atoms
      //draw lines at angles defined by posToAdd
      let connections = this.atom[3]
      connections.forEach(item => {
        //item is [index,bond order] from structure[index][3]
        if (this.drawnAtoms[item[0]] === 0) {
          let direction = posToAdd.shift();
          posOccupied.push(direction)
          if (item[1] === 1) {
            let ends = Vue.bondPositioner(this.textRect, direction);
            bondsArray.push({start: ends[0], end: ends[1]})
          }
          //need to fix these
          if (item[1] === 2) {
            let ends = Vue.doubleBondPositioner(this.textRect, direction);
            bondsArray.push({start: ends[0], end: ends[1]})
            bondsArray.push({start: ends[2], end: ends[3]})
          }
          if (item[1] === 3) {
            let ends = Vue.tripleBondPositioner(this.textRect, direction);
            bondsArray.push({start: ends[0], end: ends[1]})
            bondsArray.push({start: ends[2], end: ends[3]})
            bondsArray.push({start: ends[4], end: ends[5]})
          }
          //add atoms
          let directions = Array(12);
          directions.fill(0);
          let newDirectionIndex = (direction+6)%12
          directions[newDirectionIndex] = 1
          let newCenter = Vue.newAtomPositioner(this.textRect, direction)
          newAtomsArray.push({stats: {
            center: newCenter,
            directions: directions,
            atomsArray: this.stats.atomsArray,
            drawnAtoms: this.drawnAtoms,
            index: item[0]
            //org: true
          }})
        }
      })
      //add lone pairs and radicals
      if (this.numUnbondedE%2 === 1 || this.atom[5] !== 0) {
        //radical
        let numRad = 1;
        if(this.atom[5] !== 0) numRad = this.atom[5];
        for (let i = 0; i < numRad; i++) {
          let direction = posToAdd.shift()
          posOccupied.push(direction)
          //console.log(direction)
          let position = Vue.lpPositioner(this.textRect, direction, 1)
          dotsArray.push({position: position})
        }
      }
      let lpToAdd = 0;
      if (this.atom[5] !== 0) {
        lpToAdd = (this.numUnbondedE - this.atom[5])/2
        if (lpToAdd !== _.floor(lpToAdd)) console.log("bad value for numUnpairedE")
      }
      else lpToAdd = _.floor(this.numUnbondedE/2)
      //console.log('lpToAdd is: ', lpToAdd)
      for (let i = 0; i < lpToAdd; i++) {
        let direction = posToAdd.shift()
        posOccupied.push(direction)
        let dotPositions = Vue.lpPositioner(this.textRect, direction, 0)
        //console.log("dotPositions is ", dotPositions)
        dotsArray.push({position: dotPositions[0]})
        dotsArray.push({position: dotPositions[1]})
      }
      if (this.formalCharge !== 0) {
        console.log("posOccupied", posOccupied)
        for (let i = 5; i < 12; i++) {
          if (posOccupied.indexOf(i) === -1) {
            console.log("setting up fc, i is ", i)
            let fcpos = Vue.lpPositioner(this.textRect, i, 1)
            let plus = this.formalCharge > 0;
            let one = this.formalCharge === 1 || this.formalCharge === -1
            let str = String(this.formalCharge);
            if (one) str = ''
            if (plus) str = str + '+';
            if (one && !plus) str = '\u2013'
            else str = str.replace(/(-)(\d+)/, '$2\u2013')
            formalChargeToDraw = {charge: str, position: fcpos}
            break;
          }
        }
      }
      //console.log("textRect:", this.textRect )
      //console.log('bonds: ', bondsArray)
      //console.log('newAtoms: ', newAtomsArray)
      return {bonds: bondsArray, dots: dotsArray, newAtoms: newAtomsArray, formalCharge: formalChargeToDraw}
    }
  },
  mounted: function() {
    this.mounted = true
  },
  updated: function() {
  }
}
</script>
