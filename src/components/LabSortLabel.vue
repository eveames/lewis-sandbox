<template>
    <div>
        <div v-if="header[1]" class="name">{{header[1]}}</div>
        <div v-if="header[0]" class="symbol">{{header[0]}}</div>
        <div v-if="header[2]" class="appearance">{{header[2]}}</div>
        <div v-if="header[3]" class="property">m.p. {{header[3] + 273}}</div>
        <div v-if="header[4]" class="property">b.p. {{header[4] + 273}}</div>
        <div v-if="header[5]" class="property">{{header[5]}} Mohs</div>
        <div v-if="header[6]" class="property">d {{header[6]}}</div>
        ---
        <div v-if="matcherType === 1" class="name">{{choice}}</div>
        <div v-if="matcherType === 0" class="symbol">{{choice}}</div>
        <div v-if="matcherType === 2" class="appearance">{{choice}}</div>
        <div v-if="matcherType === 3" class="property">m.p. {{choice}}</div>
        <div v-if="matcherType === 4" class="property">b.p. {{choice}}</div>
        <div v-if="matcherType === 5" class="property">{{choice}} Mohs</div>
        <div v-if="matcherType === 6" class="property">d {{choice}}</div>
    </div>
</template>

<style scoped>
.name, .symbol {
    font-weight: bold;
    font-size: 1.25em;
}
.appearance {
    font-style: italic;
    font-weight: normal !important;
}
.name, .symbol, .property, .appearance {
    padding-right: 2px;
    padding-left: 2px;
}

</style>

<script>
export default {
  name: 'LabSortLabel',
  props: [
      'header',
      'choice',
      'matcherType'
  ],
  data: function() {
      return {
        msg: "Hide",
        activeIndex: 0
      }
  },
  computed: {
      isActive: function() {
          if (this.revActive === true) {
              return this.activeIndex
          }
          else return false
      }
  },
  methods: {
      toggleShow: function() {
          if (this.msg === "Show") this.msg = "Hide"
          else this.msg = "Show"
      },
      reviewChoice: function(index) {
          this.$emit("reviewChoice", index)
      }
  }
}
</script>