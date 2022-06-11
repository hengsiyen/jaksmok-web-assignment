import Vue from "vue";

// Plugins
import "./plugins/axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

// Bootstrap 4.6
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// Fontawwesome 5
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Vue meta
import VueMeta from 'vue-meta'
Vue.use(VueMeta)

// Vue paginate
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
