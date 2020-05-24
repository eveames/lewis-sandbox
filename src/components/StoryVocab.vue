<template>
    <button @click="toggleDef">
        {{key}} 
        <div v-show="showDef">({{definition}})</div>
    </button>
</template>

<script>
import {VocabData} from '../VocabData.js'

export default {
    props: [
        'key'
    ],
    data: function() {
        return {
            showDef: false
        }
    },
    computed: {
        definition: function() {
            return VocabData[this.key].def
        }
    },
    methods: {
        toggleDef: function() {
            this.showDef = !this.showDef
        }
    }
}
</script>