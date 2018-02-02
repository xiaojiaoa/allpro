import { TOGGLE_MENU, RECORD_TOKEN, RECORD_MENU, RECORD_EMPLOYEE, ROUTER_ACTIVE, CLEAR_TOKEN, RECORD_PERMISSION, RECORD_MESSAGE } from '../mutation_types';
import { Passport, Config } from '../../services/admin';
import storage from '../../libs/storage/';
import authority from '../../assets/permission/permission';

const Global = {
  namespaced: true,
  state: {
    isCollapse: storage.get('isCollapse'),
    token: storage.get('token'),
    tokenExpire: storage.get('tokenExpire'),
    menu: [],
    employee: storage.get('users'),
    permission6: [],
    permission8: [],
    routerActive: [],
    message: '',
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
      storage.set('users', data);
    },
    [RECORD_PERMISSION](state, data) {
      const permission6 = {};
      const permission8 = {};
      data.forEach((v) => {
        const a = authority[`${v}`];
        const b = authority[`${Number.parseInt(v / 100, 10)}`];
        if (a) {
          if (typeof a === 'string') {
            permission8[a] = true;
          } else {
            a.forEach(n => {
              permission8[n] = true;
            });
          }
        }
        if (b) {
          if (typeof a === 'string') {
            permission6[b] = true;
          } else {
            b.forEach(n => {
              permission6[n] = true;
            });
          }
        }
      });
      state.permission6 = permission6;
      state.permission8 = permission8;
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
    [RECORD_MESSAGE](state, data) {
      state.message = data;
    },
  },
  actions: {
    userLogin({ commit }, data) {
      Passport.login(data).then(res => {
        commit(RECORD_TOKEN, res.data);
      }).catch(err => {
        commit(RECORD_MESSAGE, err.msg);
      });
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
