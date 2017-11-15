import { TOGGLE_MENU, RECORD_TOKEN, RECORD_MENU, RECORD_EMPLOYEE, ROUTER_ACTIVE, CLEAR_TOKEN } from '../mutation_types';
import { Passport, Config } from '../../services/admin';
import storage from '../../libs/storage/';

const Global = {
  namespaced: true,
  state: {
    isCollapse: storage.get('isCollapse'),
    token: storage.get('token'),
    tokenExpire: storage.get('tokenExpire'),
    menu: {},
    employee: {},
    routerActive: [],
  },
  mutations: {
    [TOGGLE_MENU](state) {
      state.isCollapse = !state.isCollapse;
      storage.set('isCollapse', state.isCollapse);
    },
    [RECORD_TOKEN](state, data) {
      state.token = data.userTokenString;
      state.tokenExpire = data.expDate;
      storage.set('token', state.token);
      storage.set('tokenExpire', state.tokenExpire);
    },
    [CLEAR_TOKEN](state) {
      state.token = '';
      state.tokenExpire = '';
      storage.remove('token');
      storage.remove('tokenExpire');
    },
    [RECORD_MENU](state, data) {
      state.menu = data;
    },
    [RECORD_EMPLOYEE](state, data) {
      state.employee = data;
    },
    [ROUTER_ACTIVE](state, data) {
      if (data.type === 2) {
        state.routerActive = data.data;
      } else if (data.type === 1) {
        state.routerActive.splice(1, 1, data.data);
      } else {
        state.routerActive.splice(0, 1, data.data);
      }
    },
  },
  actions: {
    userLogin({ commit }, data) {
      Passport.login(data).then(res => {
        commit(RECORD_TOKEN, res.data);
      }).catch();
    },
    config({ commit }) {
      Promise.all([Config.menu(), Config.employee()]).then(([menu, employee]) => {
        commit(RECORD_MENU, menu.data);
        commit(RECORD_EMPLOYEE, employee.data);
      }).catch();
    },
  },
};

export default Global;
