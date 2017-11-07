/* eslint-disable global-require */
const INDEX = r => require.ensure([], () => r(require('../views/index.vue')), '');
const LOGIN = r => require.ensure([], () => r(require('../views/login.vue')), '');
const CENTER = r => require.ensure([], () => r(require('../views/center.vue')), '');
const MEMBER = r => require.ensure([], () => r(require('../views/member/index.vue')), '');
const EMPLOYEES = r => require.ensure([], () => r(require('../views/member/employees/index.vue')), '');
const EMPLOYEES_LIST = r => require.ensure([], () => r(require('../views/member/employees/list.vue')), '');
const EMPLOYEES_DETAIL = r => require.ensure([], () => r(require('../views/member/employees/detail.vue')), '');
const EMPLOYEES_EDIT = r => require.ensure([], () => r(require('../views/member/employees/edit.vue')), '');


export default [
  {
    path: '/index',
    redirect: '/',
  }, {
    path: '/login',
    name: '登录',
    component: LOGIN,
  }, {
    path: '/',
    component: INDEX,
    children: [
      {
        path: 'center',
        name: '首页',
        component: CENTER,
      }, {
        path: 'member',
        name: '用户',
        component: MEMBER,
        children: [
          {
            path: 'employees',
            name: '员工',
            component: EMPLOYEES,
            children: [
              {
                path: 'list',
                name: '员工列表',
                component: EMPLOYEES_LIST,
              }, {
                path: 'detail/:id',
                name: '员工详情',
                component: EMPLOYEES_DETAIL,
              }, {
                path: 'edit/:id',
                name: '员工编辑',
                component: EMPLOYEES_EDIT,
              }, {
                path: 'edit',
                name: '员工新增',
                component: EMPLOYEES_EDIT,
              },
            ],
          },
        ],
      },
    ],
  },
];
