const permissionList = {
  910000: '/center',
  900000: '/basic/cliques/add',
  900001: '/basic/cliques/edit',
  920002: '/basic/cliques/detail',
  // 87101019: '/basic/cliques/add2',
  871010: '/basic/cliques/add',
  // 员工
  97101027: '/basic/employees/add27',
  // 集团管理给所有机构新增员工
  97101029: '/basic/cliques/addOrgan29',
  // 集团管理给所有门店新增员工
  97201029: '/basic/cliques/addStore29',
  97101049: '/basic/employees/update49',
  97101048: '/basic/employees/update48',
  97101047: '/basic/employees/update47',
  // 门店
  98101019: '/basic/stores/select19',
  98101018: '/basic/stores/select18',
  98101029: '/basic/stores/add29',
  98101028: '/basic/stores/add28',
  98101039: '/basic/stores/forbid39',
  98101038: '/basic/stores/forbid38',
  98101049: '/basic/stores/edit49',
  98101048: '/basic/stores/edit48',
  // 部门信息
  // 97102017: '/basic/employees/checkAll17',
  // 部门详情页面
  97102027: '/basic/department/add27',
  97102028: '/basic/department/add28',
  97102029: '/basic/department/add29',

  97102047: '/basic/department/edit47',
  97102048: '/basic/department/edit48',
  97102049: '/basic/department/edit49',

  97102037: '/basic/department/del37',
  97102038: '/basic/department/del38',
  97102039: '/basic/department/del39',
  //  角色
  87101019: '/basic/role/select19',
  87101018: '/basic/role/select18',
  87101029: '/basic/role/add29',
  87101028: '/basic/role/add28',
  87101039: '/basic/role/forbid39',
  87101038: '/basic/role/forbid38',
  87101049: '/basic/role/edit49',
  87101048: '/basic/role/edit48',
  87201019: '/basic/role/selectStore19',
  87201018: '/basic/role/selectStore18',
  87201029: '/basic/role/addStore29',
  87201028: '/basic/role/addStore28',
  87201039: '/basic/role/forbidStore39',
  87201038: '/basic/role/forbidStore38',
  87201049: '/basic/role/editStore49',
  87201048: '/basic/role/editStore48',
  //  补单受理-组合权限
  93030201: '/order/resupplys/accepted01',

  // 93020107: '/order/orders/select01',
  93031101: ['/order/orders/remark01', '/order/resupplys/remark01'],
  93030801: ['/order/orders/process01', '/order/resupplys/process01'],
  93030901: ['/order/orders/reback01', '/order/resupplys/reback01'],
  93031201: ['/order/orders/unlock01', '/order/resupplys/unlock01'],
  93031001: ['/order/orders/reEdit01', '/order/resupplys/reEdit01'],
  //  订单审核
  93030401: ['/order/orders/review01', '/order/resupplys/review01'],
  //  订单拆单
  93030501: ['/order/orders/apartOrder01', '/order/resupplys/apartOrder01'],
  //  订单拆审
  93030601: ['/order/orders/apartReview01', '/order/resupplys/apartReview01'],
  //  订单排料
  93030701: ['/order/orders/schedule01', '/order/resupplys/schedule01'],
  //  公告
  88201000: '/basic/noticeInfo/add00',
  88202000: '/basic/noticeInfo/del0',
  88203000: '/basic/noticeInfo/edit00',
  88104000: '/basic/noticeInfo/select00',

  //  客户
  95204001: '/basic/customers/area01',
  95204000: '/basic/customers/select00',

  // 集团订单类型管理
  93070101: '/basic/cliques/listOrderType',
  93070201: '/basic/cliques/addOrderType',
  93070301: '/basic/cliques/editOrderType',
  // 仓储--新增
  91999999: '/storage/warehouse/add99',
  91999998: '/storage/warehouse/add98',
  91999997: '/storage/warehouse/add97',
  // 仓储--更新
  91999899: '/storage/warehouse/edit99',
  91999898: '/storage/warehouse/edit98',
  91999897: '/storage/warehouse/edit97',
  // 仓储--启用/禁用
  91999799: '/storage/warehouse/isAble99',
  91999798: '/storage/warehouse/isAble98',
  91999797: '/storage/warehouse/isAble97',
};
export default permissionList;
