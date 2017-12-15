import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '../vuex/';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
});

router.beforeEach((to, from, next) => {
  const target = to.fullPath.split('/');
  const routerActive = [target[1], target[2]];
  const activeData = {
    type: 2,
    data: routerActive,
  };
  store.commit('Global/ROUTER_ACTIVE', activeData);
  if (to.matched.some(m => m.meta.auth)) {
    if (!store.state.Global.token) {
      next({
        path: '/login',
        query: { Rurl: to.fullPath },
      });
    } else {
      next();
    }
  }
  next();
});

export default router;
