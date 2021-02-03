import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import { MdToolbar, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.config.productionTip = false;
Vue.use(MdToolbar);
Vue.use(MdField);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
