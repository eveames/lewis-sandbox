import Vue from 'vue'
import App from './App.vue'

window.Vue = Vue;

import LewisPositionerPlugin from './LewisPositionerPlugin.js';
import LewisStructurePlugin from './LewisStructurePlugin.js';
Vue.use(LewisPositionerPlugin);
Vue.use(LewisStructurePlugin);

Vue.config.productionTip = false

Vue.filter('formatFormula', function(value) {
  let str = String(value);
  let escapeRE = /\/|&|<|>|'|"/;
  if (escapeRE.test(str)) return "Please enter a correctly formatted formula (see example)";
  else {
    str = str.replace(/([\w)\]])(\d)/g, '$1<sub>$2</sub>');
    str = str.replace(/([+])(\d+)/, '<sup>$2$1</sup>');
    str = str.replace(/([-])(\d+)/, '<sup>$2&minus;</sup>');
    str = str.replace(/(<sup>)(1)([+&])/, '$1$3');
    return str;
  }
});


new Vue({
  render: h => h(App),
}).$mount('#app')
