import qs from 'qs';

import adminServer from '../../../config/server';

const Order = {

  // 新增订单类型
  addOrderType: (params) => Promise.resolve(adminServer.post('/api/orders/config/orderType', qs.stringify(params))),

  // 修改订单类型
  editOrderType: (params) => Promise.resolve(adminServer.put('/api/orders/config/orderType', qs.stringify(params))),

  // 新增普通单
  addOrder: (params) => Promise.resolve(adminServer.post('/api/orders', qs.stringify(params))),

  // 新增工程单
  addProject: (params) => Promise.resolve(adminServer.post('/api/orders/project', qs.stringify(params))),

  // 订单查询
  orderListQuery: (params) => Promise.resolve(adminServer.get('/api/orders?isResupply=0', { params: params })),

  // 获取子订单列表
  orderChildList: (params) => Promise.resolve(adminServer.get(`/api/orders/childOrderList/${params.parentTid}`, { params: params })),

  // 订单详情
  orderDetail: (tid) => Promise.resolve(adminServer.get(`/api/orders/${tid}`)),

  // 新增空间
  addSpace: (params) => Promise.resolve(adminServer.post('/api/space', qs.stringify(params))),
  // 门店列表
  storeList: (params) => Promise.resolve(adminServer.get('/api/store', { params: params })),
  // 获取门店
  storeDetail: (id) => Promise.resolve(adminServer.get(`/api/store/${id}`)),

  // 获取订单列表空间
  orderList: (id) => Promise.resolve(adminServer.get(`/api/space/${id}/0`)),

  // 获取未删除订单
  undeletedOrder: (params) => Promise.resolve(adminServer.get(`/api/space/${params.lid}/0?stcode=${params.stcode}`)),

  // 获取订单下文件
  orderFileInfo: (params) => Promise.resolve(adminServer.get(`/api/order/file/${params.id}?orderFileType=${params.typeId}&tid=${params.tid}`)),

  // 获取订单所有文件
  orderAllFileInfo: (params) => Promise.resolve(adminServer.get(`/api/order/file/${params.lid}?&tid=${params.tid}`)),

  // 获取订单文件类型
  orderFileType: (stcode) => Promise.resolve(adminServer.get(`/api/assist/orderfile/type?type=${stcode}`)),

  // 上传订单文件
  addOrderFile: (params) => Promise.resolve(adminServer.post('/api/order/file/measfile', qs.stringify(params))),

  // 删除订单文件
  delFileInfo: (id) => Promise.resolve(adminServer.delete(`/api/order/file/${id}`)),

  // 获取交流信息
  detailCommunication: (tid) => Promise.resolve(adminServer.get(`/api/orders/progress?tid=${tid}&type=1`)),

  // 获取状态信息
  orderStatus: (tid) => Promise.resolve(adminServer.get(`/api/orders/statusInfo/${tid}`)),

  // 获取订单日志信息
  orderLog: (params) => Promise.resolve(adminServer.get('/api/orders/progress', { params: params })),

  // 获取订单下文件信息
  singleOrderFileInfo: (params) => Promise.resolve(adminServer.get(`/api/order/file/${params.lid}?tid=${params.tid}`)),

  // 订单退回消息
  returnInfo: (params) => Promise.resolve(adminServer.get('/api/orders/back', { params: params })),

  // 新增交流信息
  communication: (params) => Promise.resolve(adminServer.post('/api/orders/progress', qs.stringify(params))),

  // 下单完毕
  closeOrder: (lid) => Promise.resolve(adminServer.put(`/api/orders/place/${lid}`)),

  // 取消下单完毕
  cancelOrder: (lid) => Promise.resolve(adminServer.put(`/api/orders/place/cancel/${lid}`)),

  // 提交订单审核
  checkOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/review/submit/${tid}`)),

  // 订单删除
  deleteOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/close/${tid}`)),

  // 子订单删除
  deleteChildOrder: (tids) => Promise.resolve(adminServer.put(`/api/orders/childOrder/close?tids=${tids}`)),

  // 订单重新编辑
  reEditOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/build/reedit/${tid}`)),

  // 订单信息修改
  orderEdit: (params) => Promise.resolve(adminServer.put(`/api/orders/updateOrder/${params.id}`, qs.stringify(params))),

  // 成品物料信息
  getMaterial: () => Promise.resolve(adminServer.get('/api/material/marketable')),

  // 导出订单列表
  exportOrder: (params) => Promise.resolve(adminServer.post('/api/orders/orderPage/export', qs.stringify(params))),

};

export default Order;
