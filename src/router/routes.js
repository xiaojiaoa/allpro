/* eslint-disable global-require */
const INDEX = r => require.ensure([], () => r(require('../views/index.vue')), '');
const LOGIN = r => require.ensure([], () => r(require('../views/login.vue')), '');
const CENTER = r => require.ensure([], () => r(require('../views/center.vue')), '');
const BASIC = r => require.ensure([], () => r(require('../views/basic/index.vue')), '');
const ORDER = r => require.ensure([], () => r(require('../views/order/index.vue')), '');

// 员工管理
const EMPLOYEES = r => require.ensure([], () => r(require('../views/basic/employees/index.vue')), '');
const EMPLOYEES_LIST = r => require.ensure([], () => r(require('../views/basic/employees/list.vue')), '');
const EMPLOYEES_DETAIL = r => require.ensure([], () => r(require('../views/basic/employees/detail.vue')), '');
const EMPLOYEES_EDIT = r => require.ensure([], () => r(require('../views/basic/employees/edit.vue')), '');
const EMPLOYEES_PASSWORD = r => require.ensure([], () => r(require('../views/basic/employees/changePassword.vue')), '');

// 门店管理
const STORE = r => require.ensure([], () => r(require('../views/basic/store/index.vue')), '');
const STORE_LIST = r => require.ensure([], () => r(require('../views/basic/store/list.vue')), '');
const STORE_DETAIL = r => require.ensure([], () => r(require('../views/basic/store/detail.vue')), '');
const STORE_EDIT = r => require.ensure([], () => r(require('../views/basic/store/edit.vue')), '');

// 集团管理
const CLIQUES = r => require.ensure([], () => r(require('../views/basic/cliques/index.vue')), '');
const CLIQUES_LIST = r => require.ensure([], () => r(require('../views/basic/cliques/list.vue')), '');
const CLIQUES_DETAIL = r => require.ensure([], () => r(require('../views/basic/cliques/detail.vue')), '');
const CLIQUES_EDIT = r => require.ensure([], () => r(require('../views/basic/cliques/edit.vue')), '');
const CLIQUES_MANAGEMENT = r => require.ensure([], () => r(require('../views/basic/cliques/management.vue')), '');

// 模板管理
const TEMPLATES = r => require.ensure([], () => r(require('../views/basic/templates/index.vue')), '');
const TEMPLATES_LIST = r => require.ensure([], () => r(require('../views/basic/templates/list.vue')), '');

// 查看部门信息
const DEPARTMENT = r => require.ensure([], () => r(require('../views/basic/department/index.vue')), '');
const DEPARTMENT_LIST = r => require.ensure([], () => r(require('../views/basic/department/list.vue')), '');

// 公告管理
const NOTICEINFO = r => require.ensure([], () => r(require('../views/basic/noticeInfo/index.vue')), '');
const NOTICEINFO_LIST = r => require.ensure([], () => r(require('../views/basic/noticeInfo/list.vue')), '');
const NOTICEINFO_CREATE = r => require.ensure([], () => r(require('../views/basic/noticeInfo/edit.vue')), '');
const NOTICEINFO_DETAIL = r => require.ensure([], () => r(require('../views/basic/noticeInfo/detail.vue')), '');
const NOTICEINFO_MODIFY = r => require.ensure([], () => r(require('../views/basic/noticeInfo/edit.vue')), '');

// 查看角色信息
const ROLE = r => require.ensure([], () => r(require('../views/basic/role/index.vue')), '');
const ROLE_LIST = r => require.ensure([], () => r(require('../views/basic/role/list.vue')), '');

// 流水管理
const TASKSEQ = r => require.ensure([], () => r(require('../views/order/taskseq/index.vue')), '');
const TASKSEQ_LIST = r => require.ensure([], () => r(require('../views/order/taskseq/list.vue')), '');

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
        path: 'basic',
        name: '基础模块',
        component: BASIC,
        children: [
          {
            path: 'employees',
            name: '员工管理',
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
              }, {
                path: 'changePassword',
                name: '修改密码',
                component: EMPLOYEES_PASSWORD,
              },
            ],
          }, {
            path: 'stores',
            name: '门店管理',
            component: STORE,
            children: [
              {
                path: 'list',
                name: '门店列表',
                component: STORE_LIST,
              }, {
                path: 'detail/:id',
                name: '门店详情',
                component: STORE_DETAIL,
              }, {
                path: 'edit/:id',
                name: '门店编辑',
                component: STORE_EDIT,
              }, {
                path: 'edit',
                name: '门店新增',
                component: STORE_EDIT,
              },
            ],
          }, {
            path: 'cliques',
            name: '集团管理',
            component: CLIQUES,
            children: [
              {
                path: 'list',
                name: '集团列表',
                component: CLIQUES_LIST,
              }, {
                path: 'detail/:id',
                name: '集团详情',
                component: CLIQUES_DETAIL,
              }, {
                path: 'edit/:id',
                name: '集团编辑',
                component: CLIQUES_EDIT,
              }, {
                path: 'edit',
                name: '集团新增',
                component: CLIQUES_EDIT,
              }, {
                path: 'management/:id',
                name: '集团管理',
                component: CLIQUES_MANAGEMENT,
              },
            ],
          }, {
            path: 'templates',
            name: '模板管理',
            component: TEMPLATES,
            children: [
              {
                path: 'list',
                name: '模板列表',
                component: TEMPLATES_LIST,
              },
            ],
          }, {
            path: 'department',
            name: '查看所有部门信息',
            component: DEPARTMENT,
            children: [
              {
                path: 'list',
                name: '部门列表',
                component: DEPARTMENT_LIST,
              },
            ],
          }, {
            path: 'noticeInfo',
            name: '公告管理',
            component: NOTICEINFO,
            children: [
              {
                path: 'list',
                name: '公告列表',
                component: NOTICEINFO_LIST,
              }, {
                path: 'edit',
                name: '新建公告',
                component: NOTICEINFO_CREATE,
              }, {
                path: 'detail/:id',
                name: '公告详情',
                component: NOTICEINFO_DETAIL,
              }, {
                path: 'edit/:id',
                name: '修改公告',
                component: NOTICEINFO_MODIFY,
              },
            ],
          }, {
            path: 'role',
            name: '角色管理',
            component: ROLE,
            children: [
              {
                path: 'list',
                name: '角色列表',
                component: ROLE_LIST,
              },
            ],
          },
        ],
      }, {
        path: 'order',
        name: '订单模块',
        component: ORDER,
        children: [
          {
            path: 'taskseq',
            name: '流水管理',
            component: TASKSEQ,
            children: [
              {
                path: 'list',
                name: '流水列表',
                component: TASKSEQ_LIST,
              },
            ],
          },
        ],
      },
    ],
  },
];
