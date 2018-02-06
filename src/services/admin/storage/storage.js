import qs from 'qs';

import adminServer from '../../../config/server';

const Storage = {
  // 获取机构
  organList: (id) => Promise.resolve(adminServer.get(`/api/organization/list/${id}`)),
  // 存储类型
  PackageType: () => Promise.resolve(adminServer.get('/api/assist/package/types/0')),
  // 仓库列表
  warehouseList: () => Promise.resolve(adminServer.get('/api/whse/warehouse/list')),
  // 区域列表
  regionsList: () => Promise.resolve(adminServer.get('/api/whse/region/list')),
  /*
   仓库
  */
  // 获取仓库列表
  storageList: (params) => Promise.resolve(adminServer.get('/api/whse/warehouse/page', { params: params })),
  // 获取仓库详情
  storageDetail: (id) => Promise.resolve(adminServer.get(`/api/whse/warehouse/${id}`)),
  // 新增仓库
  storageAdd: (params) => Promise.resolve(adminServer.post('/api/whse/warehouse', qs.stringify(params))),
  // 编辑仓库
  storageEdit: (params) => Promise.resolve(adminServer.put('/api/whse/warehouse', qs.stringify(params))),
  // 禁用仓库
  storageDisable: (params) => Promise.resolve(adminServer.post('/api/whse/warehouse/delete', qs.stringify(params))),
  // 启用仓库
  storageEnable: (params) => Promise.resolve(adminServer.post('/api/whse/warehouse/enable', qs.stringify(params))),
  /*
   仓库区域
  */
  // 获取仓库区域列表
  regionList: (params) => Promise.resolve(adminServer.get('/api/whse/region/page', { params: params })),
  // 获取仓库区域详情
  regionDetail: (id) => Promise.resolve(adminServer.get(`/api/whse/region/${id}`)),
  // 新增仓库区域
  regionAdd: (params) => Promise.resolve(adminServer.post('/api/whse/region', qs.stringify(params))),
  // 编辑仓库区域
  regionEdit: (params) => Promise.resolve(adminServer.put('/api/whse/region', qs.stringify(params))),
  // 禁用仓库区域
  regionDisable: (params) => Promise.resolve(adminServer.post('/api/whse/region/delete', qs.stringify(params))),
  // 启用仓库区域
  regionEnable: (params) => Promise.resolve(adminServer.post('/api/whse/region/enable', qs.stringify(params))),
  /*
   货位
  */
  // 获取货位列表
  cargospaceList: (params) => Promise.resolve(adminServer.get('/api/whse/cargospace/page', { params: params })),
  // 获取货位详情
  cargospaceDetail: (id) => Promise.resolve(adminServer.get(`/api/whse/cargospace/spaceId/${id}`)),
  // 编辑货位
  cargospaceEdit: (params) => Promise.resolve(adminServer.put('/api/whse/cargospace', qs.stringify(params))),
  // 新增货位
  cargospaceAdd: (params) => Promise.resolve(adminServer.post('/api/whse/cargospace', qs.stringify(params))),
  // 禁用货位
  cargospaceDisable: (params) => Promise.resolve(adminServer.post('/api/whse/cargospace/delete', qs.stringify(params))),
  // 启用货位
  cargospaceEnable: (params) => Promise.resolve(adminServer.post('/api/whse/cargospace/enable', qs.stringify(params))),

};

export default Storage;
