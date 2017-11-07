import Vue from 'vue';
import Vuex from 'vuex';
import Browser from './modules/browser';
import Global from './modules/global';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const vuex = new Vuex.Store({
  modules: {
    Browser,
    Global,
  },
  strict: debug,
});


export default vuex;
