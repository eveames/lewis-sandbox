<template>
    <div>
        <div v-if="pindex=0">
            <p>Imagine the eccentric chemist you would like to be your mentor. Their name is <input v-model='mentorName'/>. They might not quite be a mad scientist, but you can tell they are unusual by the remarkably jumbled state of their lab. (If your imagined mentor is not reckless and disorganized, and very sensible you are if so, then perhaps the state of the lab is not their fault, and they inherited the mess from some other truly wild character.)</p>

            <p>"Welcome <input v-model='studentName'/>!", {{mentorName}} says. "It looks like your first job will be to help me organize my lab! I wonder if I have any gold around here. See if you can find me some."</p>

            <LabGlassware type="graduated cylinder" data="[]"/>
            <LabBalance analytical="true" sampleType="solid" sampleMass="10.1" containerType="none" containerMass="0"/>

            <button v-on:click="pindex = 1">Okay!</button>
        </div>

        <div v-if="pindex=1"> 
            <p>You look around the lab. There are lots of poorly labelled bottles and jars and <StoryVocab key="gas cylinders"/> and other things. (It's a good thing this is a virtual lab, because in real life unlabelled lab chemicals are a serious safety hazard!)</p>

            <p>There's also lots of equipment. You see glassware (flasks, test tubes,  graduated cylinders, etc), unfamiliar machines, bunsen burners, a balance, and lots of other stuff. There are sinks and cabinets and fume hoods too.</p>

            <p>Eventually you spot a piece of something that might be gold sitting on a pile of papers. It's a cylinder about the size of your pinkie.</p> 
            <button @click="show1 = true">Pick it up</button>
        </div>
    </div>
</template>

<script>
import StoryVocab from './StoryVocab.vue'
import LabGlassware from './LabGlassware.vue'
import LabBalance from './LabBalance.vue'

export default {
    components: { 
        LabBalance,
        LabGlassware,
        StoryVocab
  },
  data: function() {
    return {
      index: 0,
      mentorName: "Professor C",
      studentName: "dear student",
      show1: false
    }
  },
  //props: ['questionTypeID'],
  computed: {
  },
  methods: {
  }
}
</script>