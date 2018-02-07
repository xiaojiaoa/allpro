import axios from 'axios';
import store from '../vuex/';
import router from '../router/router';

//  经销商微信服务器
const adminServer = axios.create({
  baseURL: process.env.ADMIN_SERVER,
});


//  经销商微信服务器
const staticServerAxios = axios.create({
  baseURL: process.env.STATIC_SERVER,
});

const staticServer = process.env.STATIC_SERVER;


const downloadUrl = res => {
  const blob = new Blob([res.data], { type: 'application/zip' });
  const link = document.createElement('a');
  link.download = JSON.parse(res.config.data).fileName;
  link.href = URL.createObjectURL(blob);
  link.click();
  window.URL.revokeObjectURL(link.href);
};

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

staticServerAxios.interceptors.response.use(
  response => {
    const responseNew = response;
    if (responseNew.headers && (responseNew.headers['content-type'] === 'application/octet-stream;charset=UTF-8')) {
      downloadUrl(responseNew);
    }
    return responseNew;
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
        // case 90200206:
        //   store.commit('Global/CLEAR_TOKEN');
        //   router.replace({
        //     path: '/basic/userCenter/list',
        //   }); break;
        default: break;
      }
    }
    return Promise.reject(error.response.data);
  },
);
export default adminServer;
export {
  staticServer,
  staticServerAxios,
};
