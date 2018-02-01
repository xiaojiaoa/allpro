// import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {
  // 获取流水列表
  list: (params) => Promise.resolve(adminServer.get('/api/taskflow/flow/page', { params: params })),
  // 根据门店号获取设计师
  designer: (bid) => Promise.resolve(adminServer.get(`/api/store/employee/designer/${bid}`)),
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

