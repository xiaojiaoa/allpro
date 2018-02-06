// import qs from 'qs';

import adminServer from '../../../config/server';

const Assistant = {
  /*
    地区接口，获取省市区
    params:  id
    */
  address: (id) => Promise.resolve(adminServer.get('/api/assist/areacode', { params: id })),

  /*
    获取大区信息
    params:  parentId
    */
  region: (parentId) => Promise.resolve(adminServer.get(`/api/assist/region/types?parentId=${parentId}`)),

  /*
    获取门店类型
    */
  store: () => Promise.resolve(adminServer.get('/api/assist/store/types')),

  /*
    获取门店列表
    */
  storeList: () => Promise.resolve(adminServer.get('/api/store/list')),

  /*
    获取经营类型
    */
  addrTypes: () => Promise.resolve(adminServer.get('/api/assist/store/addrTypes')),

  /*
    获取机构类型
    */
  organ: () => Promise.resolve(adminServer.get('/api/assist/organ/types')),

  /*
    获取集团以下机构类型
    */
  clique: () => Promise.resolve(adminServer.get('/api/assist/organ/types/clique')),

  /*
    获取集团列表
    */
  cliqueList: () => Promise.resolve(adminServer.get('/api/organization/list/clique')),

  /*
    获取角色类型
    */
  role: () => Promise.resolve(adminServer.get('/api/assist/organ/types')),

  /*
    获取可用学历信息
    */
  education: () => Promise.resolve(adminServer.get('/api/assist/education')),

  /*
  获取企业所属行业
  */
  enterpriseIndusty: () => Promise.resolve(adminServer.get('/api/assist/ec/industy')),

  /*
    获取企业类型
    */
  enterpriseType: () => Promise.resolve(adminServer.get('/api/assist/ec/type')),

  /*
    获取订单类型（按集团）
    */
  orderTypeByClique: (params) => Promise.resolve(adminServer.get(`/api/assist/order/type/clique/${params.id}`, { params: params })),

  /*
    获取订单类型（按订单类型ID）
    */
  orderTypeById: (params) => Promise.resolve(adminServer.get('/api/assist/order/type', { params: params })),

  /*
    获取订单大类
    */
  superType: (params) => Promise.resolve(adminServer.get('/api/assist/order/superType', { params: params })),

  /*
    获取订单流程码
    */
  flowCode: (params) => Promise.resolve(adminServer.get('/api/assist/order/flowCode', { params: params })),

  /*
    获取订单流程码详情
    */
  flowCodeDetail: (params) => Promise.resolve(adminServer.get(`/api/assist/order/flowCodeDetail/${params.orderType}`, { params: params })),

  /*
    供应商交货方式
  */
  supDelivery: (params) => Promise.resolve(adminServer.get('/api/assist/delivery/type', { params: params })),
  /*
   请购单状态
   */
  reqStcode: (params) => Promise.resolve(adminServer.get('/api/assist/request/stcode', { params: params })),

  /*
   采购单状态
   */
  purStcode: (params) => Promise.resolve(adminServer.get('/api/assist/purchase/stcode', { params: params })),

  /*
   采购合同付款方式
   */
  purPay: (params) => Promise.resolve(adminServer.get('/api/assist/payment/type', { params: params })),

  /*
   采购合同运输方式
   */
  purTrans: (params) => Promise.resolve(adminServer.get('/api/assist/carriage/type', { params: params })),

};

export default Assistant;
