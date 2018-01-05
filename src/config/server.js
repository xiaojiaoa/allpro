import axios from 'axios';
import store from '../vuex/';
import router from '../router/router';

//  经销商微信服务器
const adminServer = axios.create({
  baseURL: process.env.ADMIN_SERVER,
});

const staticServer = process.env.STATIC_SERVER;


//  拦截器配置
adminServer.interceptors.request.use(
  config => {
    const configNew = config;
    if (store.state.Global.token) {
      configNew.headers['x-auth-token'] = store.state.Global.token;
    }
    return configNew;
  },
  err => {
    return Promise.reject(err);
  },
);


adminServer.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.data.code) {
        case 90220160:
        case 90200205:
          store.commit('Global/CLEAR_TOKEN');
          router.replace({
            path: '/login',
            query: { Rurl: router.currentRoute.fullPath },
          }); break;
        case 90200206:
          store.commit('Global/CLEAR_TOKEN');
          router.replace({
            path: '/basic/userCenter/list',
          }); break;
        default: break;
      }
    }
    return Promise.reject(error.response.data);
  },
);
export default adminServer;
export {
  staticServer,
};
