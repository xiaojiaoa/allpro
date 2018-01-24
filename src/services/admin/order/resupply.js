import qs from 'qs';

import adminServer from '../../../config/server';

const Resupply = {
  // 补单查询
  resupplyListQuery: (params) => Promise.resolve(adminServer.get('/api/orders/resupply', { params: params })),

  // 补单详情
  orderDetail: (tid) => Promise.resolve(adminServer.get(`/api/orders/resupply/detail/${tid}`)),

  // 新增补单
  addResupplys: (params) => Promise.resolve(adminServer.post('/api/orders/resupply', qs.stringify(params))),

  // 获取补单列表空间
  resupplysList: (id) => Promise.resolve(adminServer.get(`/api/space/${id}/1`)),

  // 获取未删除补单
  undeletedOrder: (params) => Promise.resolve(adminServer.get(`/api/space/${params.lid}/1?stcode=${params.stcode}`)),

  // 获取补单所有文件
  orderAllFileInfo: (params) => Promise.resolve(adminServer.get(`/api/order/file/${params.lid}?&tid=${params.tid}`)),

  // 获取补单文件类型
  orderFileType: (stcode) => Promise.resolve(adminServer.get(`/api/assist/orderfile/type?type=${stcode}`)),

  // 上传补单文件
  addOrderFile: (params) => Promise.resolve(adminServer.post('/api/order/file/measfile', qs.stringify(params))),

  // 删除补单文件
  delFileInfo: (id) => Promise.resolve(adminServer.delete(`/api/order/file/${id}`)),

  // 获取交流信息
  detailCommunication: (tid) => Promise.resolve(adminServer.get(`/api/orders/progress?tid=${tid}&type=1`)),

  // 新增交流信息
  communication: (params) => Promise.resolve(adminServer.post('/api/orders/progress', qs.stringify(params))),

  // 获取补单状态信息
  orderStatus: (tid) => Promise.resolve(adminServer.get(`/api/orders/statusInfo/${tid}`)),

  // 获取补单日志信息
  orderLog: (params) => Promise.resolve(adminServer.get('/api/orders/progress', { params: params })),

  // 获取补单下文件信息
  singleOrderFileInfo: (params) => Promise.resolve(adminServer.get(`/api/order/file/${params.lid}?tid=${params.tid}`)),

  // 补单退回消息
  returnInfo: (tid) => Promise.resolve(adminServer.get(`/api/orders/back?tid=${tid}`)),

  // 下单完毕
  closeOrder: (lid) => Promise.resolve(adminServer.put(`/api/orders/place/${lid}`)),

  // 取消下单完毕
  cancelOrder: (lid) => Promise.resolve(adminServer.put(`/api/orders/place/cancel/${lid}`)),

  // 提交补单审核
  checkOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/review/submit/${tid}`)),

  // 补单删除
  deleteOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/close/${tid}`)),

  // 补单-审核-重新编辑
  reEditOrder: (tid) => Promise.resolve(adminServer.put(`/api/orders/build/reedit/${tid}`)),

  // 标记为加盟中
  joinConfirming: (tid) => Promise.resolve(adminServer.put(`/api/orders/joinConfirm/joinConfirming/${tid}`)),

  // 补单加盟
  joinConfirmed: (tid) => Promise.resolve(adminServer.put(`/api/orders/joinConfirm/joinConfirmed/${tid}`)),

  // 加盟退回
  joinReback: (params, tid) => Promise.resolve(adminServer.put(`/api/orders/joinConfirm/joinConfirmBack/${tid}`, qs.stringify(params))),

  // 解锁
  unlock: (tid) => Promise.resolve(adminServer.put(`/api/orders/joinConfirm/unlock/${tid}`)),

  // 补单-加盟-重新编辑
  joinReEdit: (tid) => Promise.resolve(adminServer.put(`/api/orders/joinConfirm/reedit/${tid}`)),

};

export default Resupply;
