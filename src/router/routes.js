/* eslint-disable global-require */
const INDEX = r => require.ensure([], () => r(require('../views/index.vue')), '');
const LOGIN = r => require.ensure([], () => r(require('../views/login.vue')), '');
const CENTER = r => require.ensure([], () => r(require('../views/center.vue')), '');
const BASIC = r => require.ensure([], () => r(require('../views/basic/index.vue')), '');
const ORDER = r => require.ensure([], () => r(require('../views/order/index.vue')), '');
const PURCHASE = r => require.ensure([], () => r(require('../views/purchase/index.vue')), '');
const STORAGE = r => require.ensure([], () => r(require('../views/storage/index.vue')), '');
const PRODUCE = r => require.ensure([], () => r(require('../views/produce/index.vue')), '');
const WORKSHOP = r => require.ensure([], () => r(require('../views/workshop/index.vue')), '');
const REPORT = r => require.ensure([], () => r(require('../views/report/index.vue')), '');

// 员工管理
const EMPLOYEES = r => require.ensure([], () => r(require('../views/basic/employees/index.vue')), '');
const EMPLOYEES_LIST = r => require.ensure([], () => r(require('../views/basic/employees/list.vue')), '');
const EMPLOYEES_DETAIL = r => require.ensure([], () => r(require('../views/basic/employees/detail.vue')), '');
const EMPLOYEES_EDIT = r => require.ensure([], () => r(require('../views/basic/employees/edit.vue')), '');
const EMPLOYEES_PASSWORD = r => require.ensure([], () => r(require('../views/basic/employees/changePassword.vue')), '');

// 客户管理
const CUSTOMERS = r => require.ensure([], () => r(require('../views/basic/customers/index.vue')), '');
const CUSTOMERS_LIST = r => require.ensure([], () => r(require('../views/basic/customers/list.vue')), '');
const CUSTOMERS_DETAIL = r => require.ensure([], () => r(require('../views/basic/customers/detail.vue')), '');
const CUSTOMERS_DETAIL_ENTERPRICE = r => require.ensure([], () => r(require('../views/basic/customers/detail_enterprise.vue')), '');

// 门店管理
const STORE = r => require.ensure([], () => r(require('../views/basic/store/index.vue')), '');
const STORE_LIST = r => require.ensure([], () => r(require('../views/basic/store/list.vue')), '');
const STORE_DETAIL = r => require.ensure([], () => r(require('../views/basic/store/detail.vue')), '');
const STORE_EDIT = r => require.ensure([], () => r(require('../views/basic/store/edit.vue')), '');


// 机构管理
const ORGANIZATION = r => require.ensure([], () => r(require('../views/basic/organization/index.vue')), '');
const ORGANIZATION_LIST = r => require.ensure([], () => r(require('../views/basic/organization/list.vue')), '');
const ORGANIZATION_DETAIL = r => require.ensure([], () => r(require('../views/basic/organization/detail.vue')), '');
const ORGANIZATION_EDIT = r => require.ensure([], () => r(require('../views/basic/organization/edit.vue')), '');


// 集团管理
const CLIQUES = r => require.ensure([], () => r(require('../views/basic/cliques/index.vue')), '');
const CLIQUES_LIST = r => require.ensure([], () => r(require('../views/basic/cliques/list.vue')), '');
const CLIQUES_DETAIL = r => require.ensure([], () => r(require('../views/basic/cliques/detail.vue')), '');
const CLIQUES_EDIT = r => require.ensure([], () => r(require('../views/basic/cliques/edit.vue')), '');
const CLIQUES_MANAGEMENT = r => require.ensure([], () => r(require('../views/basic/cliques/management.vue')), '');

// 物料管理
const MATERIAL = r => require.ensure([], () => r(require('../views/basic/material/index.vue')), '');
const MATERIAL_LIST = r => require.ensure([], () => r(require('../views/basic/material/list.vue')), '');
const MATERIAL_EDIT = r => require.ensure([], () => r(require('../views/basic/material/edit.vue')), '');
const MATERIAL_DETAIL = r => require.ensure([], () => r(require('../views/basic/material/detail.vue')), '');

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
const ROLE_CREATE = r => require.ensure([], () => r(require('../views/basic/role/edit.vue')), '');
const ROLE_MODIFY = r => require.ensure([], () => r(require('../views/basic/role/edit.vue')), '');

// 流水管理
const TASKSEQ = r => require.ensure([], () => r(require('../views/order/taskseq/index.vue')), '');
const TASKSEQ_LIST = r => require.ensure([], () => r(require('../views/order/taskseq/list.vue')), '');
const TASKSEQ_DETAIL = r => require.ensure([], () => r(require('../views/order/taskseq/detail.vue')), '');
const TASKSEQ_COMMUNICATE = r => require.ensure([], () => r(require('../views/order/touch/communicate.vue')), '');

// 订单查询
const ORDERS = r => require.ensure([], () => r(require('../views/order/orders/index.vue')), '');
const ORDERS_LIST = r => require.ensure([], () => r(require('../views/order/orders/list.vue')), '');
const ORDERS_DETAIL = r => require.ensure([], () => r(require('../views/order/orders/detail.vue')), '');
const ORDERS_CREATE = r => require.ensure([], () => r(require('../views/order/orders/create.vue')), '');
const ORDERS_COMMUNICATE = r => require.ensure([], () => r(require('../views/order/orders/communicate.vue')), '');
const ORDERS_COMMUNICATEALL = r => require.ensure([], () => r(require('../views/order/orders/communicateAll.vue')), '');
const ORDERS_LOGINFOALL = r => require.ensure([], () => r(require('../views/order/orders/logInfoAll.vue')), '');
const ORDERS_FILECREATE = r => require.ensure([], () => r(require('../views/order/orders/file_create.vue')), '');
const ORDERS_CHILDRENORDERLIST = r => require.ensure([], () => r(require('../views/order/orders/childOrder.vue')), '');
const ORDERS_REBACKINFOALL = r => require.ensure([], () => r(require('../views/order/orders/rebackInfoAll.vue')), '');
// 补单查询
const RESUPPLYS = r => require.ensure([], () => r(require('../views/order/resupplys/index.vue')), '');
const RESUPPLYS_LIST = r => require.ensure([], () => r(require('../views/order/resupplys/list.vue')), '');
const RESUPPLYS_CREATE = r => require.ensure([], () => r(require('../views/order/resupplys/edit.vue')), '');
const RESUPPLYS_DETAIL = r => require.ensure([], () => r(require('../views/order/resupplys/detail.vue')), '');
const RESUPPLYS_COMMUNICATE = r => require.ensure([], () => r(require('../views/order/orders/communicate.vue')), '');
const RESUPPLYS_COMMUNICATEALL = r => require.ensure([], () => r(require('../views/order/orders/communicateAll.vue')), '');
const RESUPPLYS_LOGINFOALL = r => require.ensure([], () => r(require('../views/order/orders/logInfoAll.vue')), '');
const RESUPPLYS_FILECREATE = r => require.ensure([], () => r(require('../views/order/orders/file_create.vue')), '');
const RESUPPLYS_REBACKINFOALL = r => require.ensure([], () => r(require('../views/order/orders/rebackInfoAll.vue')), '');
// 补单拆单
const RESUPPLYSAPART_LIST = r => require.ensure([], () => r(require('../views/order/resupplysApart/list.vue')), '');
const RESUPPLYSAPART = r => require.ensure([], () => r(require('../views/order/resupplysApart/index.vue')), '');
// 订单拆单
const ORDERSAPART = r => require.ensure([], () => r(require('../views/order/ordersApart/index.vue')), '');
const ORDERSAPART_LIST = r => require.ensure([], () => r(require('../views/order/ordersApart/list.vue')), '');

// 补单审核
const RESUPPLYSREVIEW = r => require.ensure([], () => r(require('../views/order/resupplysReview/index.vue')), '');
const RESUPPLYSREVIEW_LIST = r => require.ensure([], () => r(require('../views/order/resupplysReview/list.vue')), '');
// 订单审核
const ORDERSREVIEW = r => require.ensure([], () => r(require('../views/order/ordersReview/index.vue')), '');
const ORDERSREVIEW_LIST = r => require.ensure([], () => r(require('../views/order/ordersReview/list.vue')), '');

// 订单排料
const ORDERSSCHEDULE = r => require.ensure([], () => r(require('../views/order/ordersSchedule/index.vue')), '');
const ORDERSSCHEDULE_LIST = r => require.ensure([], () => r(require('../views/order/ordersSchedule/list.vue')), '');
// 补单受理
const RESUPPLYSACCEPT = r => require.ensure([], () => r(require('../views/order/resupplysAccept/index.vue')), '');
const RESUPPLYSACCEPT_LIST = r => require.ensure([], () => r(require('../views/order/resupplysAccept/list.vue')), '');

// 补单拆单审核
const RESUPPLYSAPARTREVIEW = r => require.ensure([], () => r(require('../views/order/resupplysApartReview/list.vue')), '');
const RESUPPLYSAPARTREVIEW_LIST = r => require.ensure([], () => r(require('../views/order/resupplysApartReview/list.vue')), '');
// 订单拆单审核
const ORDERSAPARTREVIEW = r => require.ensure([], () => r(require('../views/order/ordersApartReview/list.vue')), '');
const ORDERSAPARTREVIEW_LIST = r => require.ensure([], () => r(require('../views/order/ordersApartReview/list.vue')), '');

// 仓库列表
const WAREHOUSE = r => require.ensure([], () => r(require('../views/storage/warehouse/index.vue')), '');
const WAREHOUSE_LIST = r => require.ensure([], () => r(require('../views/storage/warehouse/list.vue')), '');
const WAREHOUSE_DETAIL = r => require.ensure([], () => r(require('../views/storage/warehouse/detail.vue')), '');
const WAREHOUSE_EDIT = r => require.ensure([], () => r(require('../views/storage/warehouse/edit.vue')), '');

// 仓库区域
const REGION = r => require.ensure([], () => r(require('../views/storage/warehouse/index.vue')), '');
const REGION_LIST = r => require.ensure([], () => r(require('../views/storage/warehouse/region_list.vue')), '');
const REGION_DETAIL = r => require.ensure([], () => r(require('../views/storage/warehouse/region_detail.vue')), '');
const REGION_EDIT = r => require.ensure([], () => r(require('../views/storage/warehouse/region_edit.vue')), '');

// 货位
const CARGOSPACE = r => require.ensure([], () => r(require('../views/storage/warehouse/index.vue')), '');
const CARGOSPACE_LIST = r => require.ensure([], () => r(require('../views/storage/warehouse/cargospace_list.vue')), '');
const CARGOSPACE_DETAIL = r => require.ensure([], () => r(require('../views/storage/warehouse/cargospace_detail.vue')), '');
const CARGOSPACE_EDIT = r => require.ensure([], () => r(require('../views/storage/warehouse/cargospace_edit.vue')), '');

// 个人中心
const USERCENTER = r => require.ensure([], () => r(require('../views/basic/userCenter/index.vue')), '');
const USERCENTER_LIST = r => require.ensure([], () => r(require('../views/basic/userCenter/list.vue')), '');

const SITEMSG = r => require.ensure([], () => r(require('../views/basic/siteMsg/index.vue')), '');
const SITEMSG_LIST = r => require.ensure([], () => r(require('../views/basic/siteMsg/list.vue')), '');

//  采购管理
const REQUISITION = r => require.ensure([], () => r(require('../views/purchase/requisition/index.vue')), '');
const REQUISITION_LIST = r => require.ensure([], () => r(require('../views/purchase/requisition/list.vue')), '');
const REQUISITION_DETAIL = r => require.ensure([], () => r(require('../views/purchase/requisition/detail.vue')), '');
const REQUISITION_EDIT = r => require.ensure([], () => r(require('../views/purchase/requisition/editStepOne.vue')), '');
const REQUISITION_EDIT_TWO = r => require.ensure([], () => r(require('../views/purchase/requisition/editStepTwo.vue')), '');

const PURCHASES = r => require.ensure([], () => r(require('../views/purchase/purchase/index.vue')), '');
const PURCHASES_LIST = r => require.ensure([], () => r(require('../views/purchase/purchase/list.vue')), '');
const PURCHASES_DETAIL = r => require.ensure([], () => r(require('../views/purchase/purchase/detail.vue')), '');
const PURCHASES_EDIT = r => require.ensure([], () => r(require('../views/purchase/purchase/editStepOne.vue')), '');
const PURCHASES_EDIT_TWO = r => require.ensure([], () => r(require('../views/purchase/purchase/editStepTwo.vue')), '');

const PURCHASECONTRACT = r => require.ensure([], () => r(require('../views/purchase/contract/index.vue')), '');
const PURCHASECONTRACT_LIST = r => require.ensure([], () => r(require('../views/purchase/contract/list.vue')), '');
const PURCHASECONTRACT_DETAIL = r => require.ensure([], () => r(require('../views/purchase/contract/detail.vue')), '');

const PURCHASERECIEVE = r => require.ensure([], () => r(require('../views/purchase/recieve/index.vue')), '');
const PURCHASERECIEVE_LIST = r => require.ensure([], () => r(require('../views/purchase/recieve/list.vue')), '');
const PURCHASERECIEVE_DETAIL = r => require.ensure([], () => r(require('../views/purchase/recieve/detail.vue')), '');

const PURCHASECHECK = r => require.ensure([], () => r(require('../views/purchase/check/index.vue')), '');
const PURCHASECHECK_LIST = r => require.ensure([], () => r(require('../views/purchase/check/list.vue')), '');
const PURCHASECHECK_DETAIL = r => require.ensure([], () => r(require('../views/purchase/check/detail.vue')), '');

//  采购-供应商
const SUPPLIER = r => require.ensure([], () => r(require('../views/purchase/supplier/index.vue')), '');
const SUPPLIER_LIST = r => require.ensure([], () => r(require('../views/purchase/supplier/list.vue')), '');
const SUPPLIER_DETAIL = r => require.ensure([], () => r(require('../views/purchase/supplier/detail.vue')), '');
const SUPPLIER_EDIT = r => require.ensure([], () => r(require('../views/purchase/supplier/edit.vue')), '');
const SUPPLIER_OFFER_PRODUCT = r => require.ensure([], () => r(require('../views/purchase/supplier/offer_product.vue')), '');

const SUPPLIERSORT = r => require.ensure([], () => r(require('../views/purchase/supplierSort/index.vue')), '');
const SUPPLIERSORT_LIST = r => require.ensure([], () => r(require('../views/purchase/supplierSort/list.vue')), '');
// 生产排程
const SCHEDULE = r => require.ensure([], () => r(require('../views/produce/schedule/index.vue')), '');
const SCHEDULE_LIST = r => require.ensure([], () => r(require('../views/produce/schedule/list.vue')), '');
// 生产线设置
const BELTLINE = r => require.ensure([], () => r(require('../views/produce/beltline/index.vue')), '');
const BELTLINE_LIST = r => require.ensure([], () => r(require('../views/produce/beltline/list.vue')), '');
// 生产监控
const MONITOR = r => require.ensure([], () => r(require('../views/produce/monitor/index.vue')), '');
const MONITOR_LIST = r => require.ensure([], () => r(require('../views/produce/monitor/list.vue')), '');
// 部件包装
const PACKAGE = r => require.ensure([], () => r(require('../views/produce/package/index.vue')), '');
const PACKAGE_LIST = r => require.ensure([], () => r(require('../views/produce/package/list.vue')), '');
// 工艺分流
const PROCESS = r => require.ensure([], () => r(require('../views/produce/process/index.vue')), '');
const PROCESS_LIST = r => require.ensure([], () => r(require('../views/produce/process/list.vue')), '');
// 车间管理
const MANAGE = r => require.ensure([], () => r(require('../views/workshop/manage/index.vue')), '');
const MANAGE_LIST = r => require.ensure([], () => r(require('../views/workshop/manage/list.vue')), '');
// 任务管理
const TASK = r => require.ensure([], () => r(require('../views/workshop/task/index.vue')), '');
const TASK_LIST = r => require.ensure([], () => r(require('../views/workshop/task/list.vue')), '');
// 门店相关报表
const STOREREPORT = r => require.ensure([], () => r(require('../views/report/store/index.vue')), '');
const STOREREPORT_LIST = r => require.ensure([], () => r(require('../views/report/store/list.vue')), '');
// 工厂相关报表
const ORGANIZATIONREPORT = r => require.ensure([], () => r(require('../views/report/organization/index.vue')), '');
const ORGANIZATIONREPORT_LIST = r => require.ensure([], () => r(require('../views/report/organization/list.vue')), '');
// 订单相关报表
const ORDERREPORT = r => require.ensure([], () => r(require('../views/report/order/index.vue')), '');
const ORDERREPORT_LIST = r => require.ensure([], () => r(require('../views/report/order/list.vue')), '');
// 图形报表
const GRAPH = r => require.ensure([], () => r(require('../views/report/graph/index.vue')), '');
const GRAPH_LIST = r => require.ensure([], () => r(require('../views/report/graph/list.vue')), '');

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
    redirect: '/basic/userCenter/list',
    meta: {
      auth: true,
    },
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
            path: 'customers',
            name: '客户',
            component: CUSTOMERS,
            children: [
              {
                path: 'list',
                name: '客户列表',
                component: CUSTOMERS_LIST,
              }, {
                path: 'detail/:id',
                name: '个人客户详情',
                component: CUSTOMERS_DETAIL,
              }, {
                path: 'detail_enterprise/:id',
                name: '企业客户详情',
                component: CUSTOMERS_DETAIL_ENTERPRICE,
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
            path: 'organization',
            name: '机构管理',
            component: ORGANIZATION,
            children: [
              {
                path: 'list',
                name: '机构列表',
                component: ORGANIZATION_LIST,
              }, {
                path: 'detail/:id',
                name: '机构详情',
                component: ORGANIZATION_DETAIL,
              }, {
                path: 'edit/:id',
                name: '机构编辑',
                component: ORGANIZATION_EDIT,
              }, {
                path: 'edit',
                name: '机构新增',
                component: ORGANIZATION_EDIT,
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
                name: '集团管理详情',
                component: CLIQUES_MANAGEMENT,
              },
            ],
          }, {
            path: 'material',
            name: '物料管理',
            component: MATERIAL,
            children: [
              {
                path: 'list',
                name: '物料列表',
                component: MATERIAL_LIST,
              }, {
                path: 'edit/:id',
                name: '物料编辑',
                component: MATERIAL_EDIT,
              }, {
                path: 'edit',
                name: '物料新增',
                component: MATERIAL_EDIT,
              }, {
                path: 'detail/:id/:no',
                name: '物料详情',
                component: MATERIAL_DETAIL,
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
              }, {
                path: 'list/:id',
                name: '部门列表管理',
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
              }, {
                path: 'edit',
                name: '新建角色',
                component: ROLE_CREATE,
              }, {
                path: 'edit/:id',
                name: '修改角色',
                component: ROLE_MODIFY,
              },
            ],
          }, {
            path: 'userCenter',
            name: '个人中心',
            component: USERCENTER,
            children: [
              {
                path: 'list',
                name: '个人信息',
                component: USERCENTER_LIST,
              },
            ],
          }, {
            path: 'siteMsg',
            name: '站内通知',
            component: SITEMSG,
            children: [
              {
                path: 'list',
                name: '站内消息',
                component: SITEMSG_LIST,
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
              }, {
                path: 'detail/:id',
                name: '流水详情',
                component: TASKSEQ_DETAIL,
              }, {
                path: 'communicate/:id',
                name: '新增交流信息',
                component: TASKSEQ_COMMUNICATE,
              },
            ],
          }, {
            path: 'orders',
            name: '订单查询',
            component: ORDERS,
            children: [
              {
                path: 'list',
                name: '订单列表',
                component: ORDERS_LIST,
              }, {
                path: 'detail/:id',
                name: '订单详情',
                component: ORDERS_DETAIL,
              }, {
                path: 'create',
                name: '新建订单',
                component: ORDERS_CREATE,
              }, {
                path: 'communicate/:id',
                name: '订单新增交流信息',
                component: ORDERS_COMMUNICATE,
              }, {
                path: 'communicateAll/:id',
                name: '查看全部交流信息',
                component: ORDERS_COMMUNICATEALL,
              }, {
                path: 'logInfoAll/:id',
                name: '查看全部日志信息',
                component: ORDERS_LOGINFOALL,
              }, {
                path: 'fileCreate/:stcode/:tid/:lid',
                name: '订单文件',
                component: ORDERS_FILECREATE,
              }, {
                path: 'childOrderList/:id',
                name: '子订单列表',
                component: ORDERS_CHILDRENORDERLIST,
              }, {
                path: 'rebackInfoAll/:id',
                name: '退回信息',
                component: ORDERS_REBACKINFOALL,
              },
            ],
          }, {
            path: 'resupplys',
            name: '补单查询',
            component: RESUPPLYS,
            children: [
              {
                path: 'list',
                name: '补单列表',
                component: RESUPPLYS_LIST,
              }, {
                path: 'create/:lid/:tid',
                name: '新建补单',
                component: RESUPPLYS_CREATE,
              }, {
                path: 'detail/:id',
                name: '补单详情',
                component: RESUPPLYS_DETAIL,
              }, {
                path: 'communicate/:id',
                name: '新增补单交流信息',
                component: RESUPPLYS_COMMUNICATE,
              }, {
                path: 'communicateAll/:id',
                name: '查看补单全部交流信息',
                component: RESUPPLYS_COMMUNICATEALL,
              }, {
                path: 'logInfoAll/:id',
                name: '查看补单全部日志信息',
                component: RESUPPLYS_LOGINFOALL,
              }, {
                path: 'fileCreate/:stcode/:tid/:lid',
                name: '补单文件',
                component: RESUPPLYS_FILECREATE,
              }, {
                path: 'rebackInfoAll/:id',
                name: '补单退回信息',
                component: RESUPPLYS_REBACKINFOALL,
              },
            ],
          }, {
            path: 'ordersApart',
            name: '订单拆单',
            component: ORDERSAPART,
            children: [
              {
                path: 'list',
                name: '订单拆单列表',
                component: ORDERSAPART_LIST,
              },
            ],
          }, {
            path: 'resupplysApart',
            name: '补单拆单',
            component: RESUPPLYSAPART,
            children: [
              {
                path: 'list',
                name: '补单拆单列表',
                component: RESUPPLYSAPART_LIST,
              },
            ],
          }, {
            path: 'resupplysReview',
            name: '补单审核',
            component: RESUPPLYSREVIEW,
            children: [
              {
                path: 'list',
                name: '补单审核列表',
                component: RESUPPLYSREVIEW_LIST,
              },
            ],
          }, {
            path: 'ordersReview',
            name: '订单审核',
            component: ORDERSREVIEW,
            children: [
              {
                path: 'list',
                name: '订单审核列表',
                component: ORDERSREVIEW_LIST,
              },
            ],
          }, {
            path: 'ordersSchedule',
            name: '订单排料',
            component: ORDERSSCHEDULE,
            children: [
              {
                path: 'list',
                name: '订单排料列表',
                component: ORDERSSCHEDULE_LIST,
              },
            ],
          }, {
            path: 'resupplysAccept',
            name: '补单受理',
            component: RESUPPLYSACCEPT,
            children: [
              {
                path: 'list',
                name: '补单受理列表',
                component: RESUPPLYSACCEPT_LIST,
              },
            ],
          }, {
            path: 'ordersApartReview',
            name: '订单拆单审核',
            component: ORDERSAPARTREVIEW,
            children: [
              {
                path: 'list',
                name: '订单拆单审核列表',
                component: ORDERSAPARTREVIEW_LIST,
              },
            ],
          }, {
            path: 'resupplysApartReview',
            name: '补单拆单审核',
            component: RESUPPLYSAPARTREVIEW,
            children: [
              {
                path: 'list',
                name: '补单拆单审核列表',
                component: RESUPPLYSAPARTREVIEW_LIST,
              },
            ],
          },
        ],
      }, {
        path: 'purchase',
        name: '采购模块',
        component: PURCHASE,
        children: [
          {
            path: 'requisition',
            name: '请购管理',
            component: REQUISITION,
            children: [
              {
                path: 'list',
                name: '请购列表',
                component: REQUISITION_LIST,
              }, {
                path: 'detail/:id',
                name: '请购详情',
                component: REQUISITION_DETAIL,
              }, {
                path: 'edit',
                name: '请购选择物料',
                component: REQUISITION_EDIT,
              }, {
                path: 'editTwo',
                name: '请购新增',
                component: REQUISITION_EDIT_TWO,
              },
            ],
          }, {
            path: 'purchases',
            name: '采购管理',
            component: PURCHASES,
            children: [
              {
                path: 'list',
                name: '采购列表',
                component: PURCHASES_LIST,
              }, {
                path: 'detail/:id',
                name: '采购详情',
                component: PURCHASES_DETAIL,
              }, {
                path: 'edit',
                name: '采购选择物料',
                component: PURCHASES_EDIT,
              }, {
                path: 'editTwo',
                name: '采购新增',
                component: PURCHASES_EDIT_TWO,
              },
            ],
          }, {
            path: 'contract',
            name: '采购合同',
            component: PURCHASECONTRACT,
            children: [
              {
                path: 'list',
                name: '合同列表',
                component: PURCHASECONTRACT_LIST,
              }, {
                path: 'detail/:id',
                name: '合同详情',
                component: PURCHASECONTRACT_DETAIL,
              },
            ],
          }, {
            path: 'recieve',
            name: '采购收货单',
            component: PURCHASERECIEVE,
            children: [
              {
                path: 'list',
                name: '收货单列表',
                component: PURCHASERECIEVE_LIST,
              }, {
                path: 'detail/:id',
                name: '收货单详情',
                component: PURCHASERECIEVE_DETAIL,
              },
            ],
          }, {
            path: 'check',
            name: '采购检验单',
            component: PURCHASECHECK,
            children: [
              {
                path: 'list',
                name: '检验单列表',
                component: PURCHASECHECK_LIST,
              }, {
                path: 'detail/:id',
                name: '检验单详情',
                component: PURCHASECHECK_DETAIL,
              },
            ],
          }, {
            path: 'supplier',
            name: '供应商管理',
            component: SUPPLIER,
            children: [
              {
                path: 'list',
                name: '供应商列表',
                component: SUPPLIER_LIST,
              }, {
                path: 'detail/:id',
                name: '供应商详情',
                component: SUPPLIER_DETAIL,
              }, {
                path: 'edit/:id',
                name: '供应商编辑',
                component: SUPPLIER_EDIT,
              }, {
                path: 'edit',
                name: '供应商新增',
                component: SUPPLIER_EDIT,
              }, {
                path: 'offerProduct',
                name: '供应商关联物料',
                component: SUPPLIER_OFFER_PRODUCT,
              },
            ],
          }, {
            path: 'supplierSort',
            name: '供应商分类管理',
            component: SUPPLIERSORT,
            children: [
              {
                path: 'list',
                name: '供应商分类列表',
                component: SUPPLIERSORT_LIST,
              },
            ],
          },
        ],
      }, {
        path: 'storage',
        name: '仓储模块',
        component: STORAGE,
        children: [
          {
            path: 'warehouse',
            name: '仓储管理',
            component: WAREHOUSE,
            children: [
              {
                path: 'list',
                name: '仓库列表',
                component: WAREHOUSE_LIST,
              }, {
                path: 'detail/:id',
                name: '仓库详情',
                component: WAREHOUSE_DETAIL,
              }, {
                path: 'edit',
                name: '仓库新建',
                component: WAREHOUSE_EDIT,
              }, {
                path: 'edit/:id',
                name: '仓库编辑',
                component: WAREHOUSE_EDIT,
              },
            ],
          }, {
            path: 'region',
            name: '仓库区域',
            component: REGION,
            children: [
              {
                path: 'list',
                name: '仓库区域列表',
                component: REGION_LIST,
              }, {
                path: 'detail/:whseId/:regionId',
                name: '仓库区域详情',
                component: REGION_DETAIL,
              }, {
                path: 'edit/:whseId',
                name: '仓库区域新建',
                component: REGION_EDIT,
              }, {
                path: 'edit/:whseId/:regionId',
                name: '仓库区域编辑',
                component: REGION_EDIT,
              },
            ],
          }, {
            path: 'cargospace',
            name: '货位',
            component: CARGOSPACE,
            children: [
              {
                path: 'list',
                name: '货位列表',
                component: CARGOSPACE_LIST,
              }, {
                path: 'detail/:spaceId',
                name: '货位详情',
                component: CARGOSPACE_DETAIL,
              }, {
                path: 'edit/:whseId/:regionId',
                name: '货位新建',
                component: CARGOSPACE_EDIT,
              }, {
                path: 'edit/:spaceId',
                name: '货位编辑',
                component: CARGOSPACE_EDIT,
              },
            ],
          },
        ],
      }, {
        path: 'produce',
        name: '生产模块',
        component: PRODUCE,
        children: [
          {
            path: 'schedule',
            name: '生产排线管理',
            component: SCHEDULE,
            children: [
              {
                path: 'list',
                name: '生产排线',
                component: SCHEDULE_LIST,
              },
            ],
          }, {
            path: 'beltline',
            name: '生产线设置',
            component: BELTLINE,
            children: [
              {
                path: 'list',
                name: '生产线列表',
                component: BELTLINE_LIST,
              },
            ],
          }, {
            path: 'monitor',
            name: '生产监控',
            component: MONITOR,
            children: [
              {
                path: 'list',
                name: '生产监控列表',
                component: MONITOR_LIST,
              },
            ],
          }, {
            path: 'package',
            name: '部件包装',
            component: PACKAGE,
            children: [
              {
                path: 'list',
                name: '部件包装列表',
                component: PACKAGE_LIST,
              },
            ],
          }, {
            path: 'process',
            name: '工艺分流',
            component: PROCESS,
            children: [
              {
                path: 'list',
                name: '工艺分流列表',
                component: PROCESS_LIST,
              },
            ],
          },
        ],
      }, {
        path: 'workshop',
        name: '车间模块',
        component: WORKSHOP,
        children: [
          {
            path: 'manage',
            name: '车间管理',
            component: MANAGE,
            children: [
              {
                path: 'list',
                name: '车间列表',
                component: MANAGE_LIST,
              },
            ],
          }, {
            path: 'task',
            name: '任务管理',
            component: TASK,
            children: [
              {
                path: 'list',
                name: '任务列表',
                component: TASK_LIST,
              },
            ],
          },
        ],
      }, {
        path: 'report',
        name: '报表模块',
        component: REPORT,
        children: [
          {
            path: 'store',
            name: '门店相关报表',
            component: STOREREPORT,
            children: [
              {
                path: 'list',
                name: '门店报表',
                component: STOREREPORT_LIST,
              },
            ],
          }, {
            path: 'organization',
            name: '工厂相关报表',
            component: ORGANIZATIONREPORT,
            children: [
              {
                path: 'list',
                name: '工厂报表',
                component: ORGANIZATIONREPORT_LIST,
              },
            ],
          }, {
            path: 'order',
            name: '订单相关报表',
            component: ORDERREPORT,
            children: [
              {
                path: 'list',
                name: '订单报表',
                component: ORDERREPORT_LIST,
              },
            ],
          }, {
            path: 'graph',
            name: '图形相关报表',
            component: GRAPH,
            children: [
              {
                path: 'list',
                name: '图形报表',
                component: GRAPH_LIST,
              },
            ],
          },
        ],
      },
    ],
  },
];
