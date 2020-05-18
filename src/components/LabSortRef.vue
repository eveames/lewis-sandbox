<template>
    <div class="card">
        <div class="card-title">
            <h4>Reference List </h4>
          <button @click="toggleShow" class="btn"
                  type="button">{{msg}}</button>
        </div>
        <div class="card-body" v-if="msg==='Hide'">
            <table v-for="(item, index) in refList" :key="index" >
                <tr >
                    <th v-for="(header, index) in item[0]" :key="header"> 
                        {{header}}<br>
                        {{item[1][index]}}
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


</style>

<script>
export default {
  name: 'LabSortRef',
  props: [
      'refList'
  ],
  data: function() {
      return {
        msg: "Hide"
      }
  },
  methods: {
      toggleShow: function() {
          if (this.msg === "Show") this.msg = "Hide"
          else this.msg = "Show"
      }
  }
}
</script>