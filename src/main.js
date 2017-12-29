// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import router from './router/router';
import store from './vuex/index';
import permission from './components/mixins/permission';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.mixin(permission);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  permission,
  render: h => h(App),
}).$mount('#app');
