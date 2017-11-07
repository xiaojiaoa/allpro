import { RECORD_MODEL } from '../mutation_types';
import model from '../../services/admin';
import storage from '../../libs/storage/';


const Config = {
  namespaced: true,
  state: {
    config: '',
  },
  mutations: {
    // 记录用户信息
    [RECORD_MODEL](state, info) {
      state.config = info;
      storage.set('test', '0');
    },
  },
  actions: {
    configData({ commit }, info) {
      model.get(info).then(res => {
        commit(RECORD_MODEL, res.data);
      }).catch(err => {
        commit(RECORD_MODEL, err);
      });
    },
  },
};

export default Config;
