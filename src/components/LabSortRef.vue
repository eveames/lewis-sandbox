<template>
    <div class="card">
        <div class="card-title">
            <h4>Reference List </h4>
          <button @click="toggleShow" class="btn"
                  type="button">{{msg}}</button>
        </div>
        <div class="card-body" v-if="msg==='Hide'">
            <table v-for="(item, index) in refList" :key="index" @click="reviewChoice(index)" class="btn" v-bind:class="{active: isActive === index}">
                <tr >
                    <th v-for="(header, index) in item[0]" :key="index">
                        <LabSortLabel :header="header" :matcherType="item[5]" :choice="item[1][index]"/> 
                    </th>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
table {
    border: solid black;
    padding: 5px;
    margin: 8px;
}
th {
    padding: 5px;
}
.active {
    border: solid red;
}

</style>

<script>
import LabSortLabel from './LabSortLabel.vue'

export default {
  name: 'LabSortRef',
  components: {
      LabSortLabel
  },
  props: [
      'refList',
      'revActive'
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