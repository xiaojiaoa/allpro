import { RECORD_BROWSER } from '../mutation_types';


const Browser = {
  namespaced: true,
  state: {
    browserStore: '',
  },
  mutations: {
    // 记录用户信息
    [RECORD_BROWSER](state, data) {
      state.browserStore = data;
    },
  },
  actions: {
  },
};

export default Browser;
