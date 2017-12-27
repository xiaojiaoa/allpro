import { TOGGLE_MENU, RECORD_TOKEN, RECORD_MENU, RECORD_EMPLOYEE, ROUTER_ACTIVE, CLEAR_TOKEN, RECORD_PERMISSION } from '../mutation_types';
import { Passport, Config } from '../../services/admin';
import storage from '../../libs/storage/';
import authority from '../../assets/permission/permission';

const Global = {
  namespaced: true,
  state: {
    isCollapse: storage.get('isCollapse'),
    token: storage.get('token'),
    tokenExpire: storage.get('tokenExpire'),
    menu: {},
    employee: {},
    permission: {},
    routerActive: [],
    userInfo: storage.get('user'),
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
    [RECORD_PERMISSION](state, data) {
      const permission = {};
      data.forEach((v) => {
        if (authority[`${v}`]) {
          permission[authority[`${v}`]] = true;
        }
      });
      state.permission = permission;
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
    [RECORD_EMPLOYEE](state, data) {
      state.userInfo = data;
      storage.set('user', data);
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
        commit(RECORD_PERMISSION, employee.data.permissionList);
      }).catch();
    },
  },
};

export default Global;
