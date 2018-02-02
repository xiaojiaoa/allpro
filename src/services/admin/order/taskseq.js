import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {
  // 流水列表
  list: (params) => Promise.resolve(adminServer.get('/api/taskflow/flow/page', { params: params })),
  // 获取量尺空间
  spaceInfo: (params) => Promise.resolve(adminServer.get('/api/assist/taskflow/spaceinfo', { params: params })),
  // 获取客户信息
  individualDetail: (id) => Promise.resolve(adminServer.get(`/api/customers/comm/${id}`)),
  // 新建流水
  measure: (params) => Promise.resolve(adminServer.post('/api/taskflow/flow/store', qs.stringify(params))),
  // 更新流水
  measureUpdate: (params) => Promise.resolve(adminServer.put('/api/taskflow/flow/store', qs.stringify(params))),
  // 获取设计师
  designer: () => Promise.resolve(adminServer.get('/api/store/employee/designer')),
  // 获取门店
  storeList: (cliqueId) => Promise.resolve(adminServer.get(`/api/store/list/${cliqueId}`)),
  // 获取流水节点
  tskStcode: () => Promise.resolve(adminServer.get('/api/assist/taskflow/flow/status')),
  // 获取流水可运行模块
  detailStcode: (id) => Promise.resolve(adminServer.get(`/api/taskflow/module/flow/list?tskfId=${id}`)),
  // 获取流水可运行模块
  detailAllStcode: (id) => Promise.resolve(adminServer.get(`/api/taskflow/module/flow/all/list?tskfId=${id}`)),
  // 获取流水基础信息
  detailBase: (id) => Promise.resolve(adminServer.get(`/api/taskflow/flow/base?tskfId=${id}`)),
  // 获取量尺信息
  detailMeasure: (id) => Promise.resolve(adminServer.get(`/api/taskflow/measure/flow?tskfId=${id}`)),
  // 获取流水文件
  detailFile: (id) => Promise.resolve(adminServer.get(`/api/taskflow/file/flow/list?tskfId=${id}`)),
  // 获取查房信息
  detailWardround: (id) => Promise.resolve(adminServer.get(`/api/taskflow/wardround/flow/list?tskfId=${id}`)),
  // 获取沟通信息
  detailTouch: (id) => Promise.resolve(adminServer.get(`/api/taskflow/touch/flow/list?tskfId=${id}`)),
  // 根据流水号获取合同
  detailContracts: (id) => Promise.resolve(adminServer.get(`/api/contract/cntr/base/tskf?tskfId=${id}`)),
  // 获取交流信息
  detailCommunication: (id) => Promise.resolve(adminServer.get(`/api/taskflow/communication/flow/list?tskfId=${id}`)),
  // 获取流水状态
  detailFlowStatus: () => Promise.resolve(adminServer.get('/api/assist/taskflow/flow/status')),
  // 允许下单
  permitOrdered: (lid) => Promise.resolve(adminServer.put(`/api/taskflow/status/allow?tskfId=${lid}`)),
  // 获取流水流程类型列表
  typeList: (params) => Promise.resolve(adminServer.get('/api/taskflow/type/page', { params: params })),
  // 获取流水功能模块列表
  moduleList: (params) => Promise.resolve(adminServer.get('/api/taskflow/module/list', { params: params })),
  // 获取可用的任务流水处理器
  procList: (params) => Promise.resolve(adminServer.get('/api/taskflow/type/proc', { params: params })),
  // 新增流水类型，包含流程
  typeSave: (params) => Promise.resolve(adminServer.post('/api/taskflow/type', params, { headers: { 'Content-Type': 'application/json' } })),
  // 新增流水类型，包含流程
  typeDetail: (tskfTypeId) => Promise.resolve(adminServer.get(`/api/taskflow/type/detail?tskfTypeId=${tskfTypeId}`)),
  // 禁用流水类型
  typeDelete: (params) => Promise.resolve(adminServer.delete('/api/taskflow/type', { params: params })),
  // 清除缓存
  storageDelete: (params) => Promise.resolve(adminServer.delete('/api/taskflow/module/cache', { params: params })),

};

export default Taskseq;

