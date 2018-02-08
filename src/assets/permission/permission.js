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
  // 仓储--列表
  91999699: ['/storage/warehouse/list99', '/storage/region/list99'],
  91999698: ['/storage/warehouse/list98', '/storage/region/list98'],
  91999697: ['/storage/warehouse/list97', '/storage/region/list97'],
  // 仓储--新增
  91999999: ['/storage/warehouse/add99', '/storage/region/add99', '/storage/cargospace/add99'],
  91999998: ['/storage/warehouse/add98', '/storage/region/add98', '/storage/cargospace/add98'],
  91999997: ['/storage/warehouse/add97', '/storage/region/add97', '/storage/cargospace/add97'],
  // 仓储--更新
  91999899: ['/storage/warehouse/edit99', '/storage/region/edit99', '/storage/cargospace/edit99'],
  91999898: ['/storage/warehouse/edit98', '/storage/region/edit98', '/storage/cargospace/edit98'],
  91999897: ['/storage/warehouse/edit97', '/storage/region/edit97', '/storage/cargospace/edit97'],
  // 仓储--启用/禁用
  91999799: ['/storage/warehouse/isAble99', '/storage/region/isAble99', '/storage/cargospace/isAble99'],
  91999798: ['/storage/warehouse/isAble98', '/storage/region/isAble98', '/storage/cargospace/isAble98'],
  91999797: ['/storage/warehouse/isAble97', '/storage/region/isAble97', '/storage/cargospace/isAble97'],
  // 流水管理
  //  任务流水
  94999999: '/basic/customers/add99',
  94999998: '/basic/customers/add98',
  94999997: ['/basic/customers/add97', '/order/taskseq/add97'],
  94999899: '/order/taskseq/update99',
  94999898: '/order/taskseq/update98',
  94999897: '/order/taskseq/update97',
  94999896: '/order/taskseq/update96',
  94999895: '/order/taskseq/update95',
  94999799: '/order/taskseq/getBase99',
  94999798: '/order/taskseq/getBase98',
  94999797: '/order/taskseq/getBase97',
  94999796: '/order/taskseq/getBase96',
  94999795: '/order/taskseq/getBase95',

  //  量尺
  94989999: '/order/taskseq/measure99',
  94989998: '/order/taskseq/measure98',
  94989997: '/order/taskseq/measure97',
  94989996: '/order/taskseq/measure96',
  94989995: '/order/taskseq/measure95',
  94989899: '/order/taskseq/getMeasure99',
  94989898: '/order/taskseq/getMeasure98',
  94989897: '/order/taskseq/getMeasure97',
  94989896: '/order/taskseq/getMeasure96',
  94989895: '/order/taskseq/getMeasure95',
  //  相关文件
  94979999: '/order/taskseq/uploadFile99',
  94979998: '/order/taskseq/uploadFile98',
  94979997: '/order/taskseq/uploadFile97',
  94979996: '/order/taskseq/uploadFile96',
  94979995: '/order/taskseq/uploadFile95',
  94979899: '/order/taskseq/getFile99',
  94979898: '/order/taskseq/getFile98',
  94979897: '/order/taskseq/getFile97',
  94979896: '/order/taskseq/getFile96',
  94979895: '/order/taskseq/getFile95',
  // 客户沟通
  94969999: '/order/taskseq/touch99',
  94969998: '/order/taskseq/touch98',
  94969997: '/order/taskseq/touch97',
  94969996: '/order/taskseq/touch96',
  94969995: '/order/taskseq/touch95',
  94969899: '/order/taskseq/getTouch99',
  94969898: '/order/taskseq/getTouch98',
  94969897: '/order/taskseq/getTouch97',
  94969896: '/order/taskseq/getTouch96',
  94969895: '/order/taskseq/getTouch95',
  // 任务查房
  94959999: '/order/taskseq/wardRound99',
  94959998: '/order/taskseq/wardRound98',
  94959997: '/order/taskseq/wardRound97',
  94959899: '/order/taskseq/getWardRound99',
  94959898: '/order/taskseq/getWardRound98',
  94959897: '/order/taskseq/getWardRound97',
  94959896: '/order/taskseq/getWardRound96',
  94959895: '/order/taskseq/getWardRound95',
  //  任务交流
  94949999: '/order/taskseq/submitCommu99',
  94949998: '/order/taskseq/submitCommu98',
  94949997: '/order/taskseq/submitCommu97',
  94949996: '/order/taskseq/submitCommu96',
  94949995: '/order/taskseq/submitCommu95',
  94949899: '/order/taskseq/getCommu99',
  94949898: '/order/taskseq/getCommu98',
  94949897: '/order/taskseq/getCommu97',
  94949896: '/order/taskseq/getCommu96',
  94949895: '/order/taskseq/getCommu95',
  //  任务未成交
  94939999: '/order/taskseq/submitFail99',
  94939998: '/order/taskseq/submitFail98',
  94939997: '/order/taskseq/submitFail97',
  94939996: '/order/taskseq/submitFail96',
  94939995: '/order/taskseq/submitFail95',
  // 合同
  // 新建流水合同
  94899999: '/order/taskseq/addContract99',
  94899998: '/order/taskseq/addContract98',
  94899997: '/order/taskseq/addContract97',
  94899996: '/order/taskseq/addContract96',
  94899995: '/order/taskseq/addContract95',
  // 根据流水号获取流水下的合同
  94899799: '/order/taskseq/getContract99',
  94899798: '/order/taskseq/getContract98',
  94899797: '/order/taskseq/getContract97',
  94899796: '/order/taskseq/getContract96',
  94899795: '/order/taskseq/getContract95',

  // 合同管理
  // 获取合同基本信息
  94899899: '/order/contracts/getContractDetail99',
  94899898: '/order/contracts/getContractDetail98',
  94899897: '/order/contracts/getContractDetail97',
  94899896: '/order/contracts/getContractDetail96',


  // 收款
  // 新增收款
  94889999: ['/order/contracts/gather99', '/order/taskseq/gather99'],
  94889998: ['/order/contracts/gather98', '/order/taskseq/gather98'],
  94889997: ['/order/contracts/gather97', '/order/taskseq/gather97'],
  94889996: ['/order/contracts/gather96', '/order/taskseq/gather96'],

  // 获取收款信息
  94889899: '/order/contracts/getGather99',
  94889898: '/order/contracts/getGather98',
  94889897: '/order/contracts/getGather97',
  94889896: '/order/contracts/getGather96',

  // 开票
  // 新增开票
  94879999: '/order/contracts/invoice99',
  94879998: '/order/contracts/invoice98',
  94879997: '/order/contracts/invoice97',
  94879996: '/order/contracts/invoice96',
  // 获取发票信息
  94879899: '/order/contracts/getInvoice99',
  94879898: '/order/contracts/getInvoice98',
  94879897: '/order/contracts/getInvoice97',
  94879896: '/order/contracts/getInvoice96',

  // 请购
  86201000: '/purchase/requisition/add00',
  86203001: '/purchase/requisition/review01',
  86203002: '/purchase/requisition/sub02',
  86204000: '/purchase/requisition/get00',
  86204001: '/purchase/requisition/get01',
  86204002: '/purchase/requisition/get02',
  86204003: '/purchase/requisition/get03',

  // 采购
  86201100: '/purchase/purchases/add00',
  86201300: '/purchase/purchases/addRecieve00',
  86201200: '/purchase/purchases/addContract00',
  86203101: '/purchase/purchases/review01',
  86203102: '/purchase/purchases/concat02',
  86203103: '/purchase/purchases/sub03',
  86204100: '/purchase/purchases/get00',
  86204101: '/purchase/purchases/get01',
  86204102: '/purchase/purchases/get02',
  86204103: '/purchase/purchases/get03',

  // 采购合同
  86203201: '/purchase/contract/review01',
  86203202: '/purchase/contract/sub02',
  86204200: '/purchase/contract/get00',
  86204201: '/purchase/contract/get01',
  86204202: '/purchase/contract/get02',
  86204203: '/purchase/contract/get03',

  //  收货单
  86201400: '/purchase/recieve/add00',
  86203301: '/purchase/recieve/review01',
  86203302: '/purchase/recieve/sub02',
  86204300: '/purchase/recieve/get00',
  86204301: '/purchase/recieve/get01',
  86204302: '/purchase/recieve/get02',
  86204303: '/purchase/recieve/get03',

  // 检验单
  86203401: '/purchase/check/review01',
  86204400: '/purchase/check/get00',
  86204401: '/purchase/check/get01',
  86204402: '/purchase/check/get02',
  86204403: '/purchase/check/get03',

  //  供应商
  86201500: '/purchase/supplier/add00',
  86204500: '/purchase/supplier/get00',
  86204501: '/purchase/supplier/get01',
  86204503: '/purchase/supplier/get03',

  //  分类
  86201600: '/purchase/supplierSort/add00',
  86204600: '/purchase/supplierSort/get00',
  86204601: '/purchase/supplierSort/get01',
  86204602: '/purchase/supplierSort/get02',
};
export default permissionList;
