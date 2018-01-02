import qs from 'qs';

import adminServer, { staticServer } from '../../../config/server';

const Material = {
  // 物料列表
  list: (params) => Promise.resolve(adminServer.get('/api/material', { params: params })),
  // 物料分类列表
  typeList: (params) => Promise.resolve(adminServer.get('/api/material/type/list', { params: params })),
  // 获取物料分类详情
  detailType: (id) => Promise.resolve(adminServer.get(`/api/material/type/${id}`)),
  // 新增物料分类
  addType: (params) => Promise.resolve(adminServer.post('/api/material/type', qs.stringify(params))),
  // 修改物料分类
  editType: (params) => Promise.resolve(adminServer.put(`/api/material/type/${params.id}`, qs.stringify(params))),
  // 修改物料分类状态
  deleteType: (id) => Promise.resolve(adminServer.put(`/api/material/type/stcode/${id}?stcode=0`)),

  // 物料单位分类
  unitList: (params) => Promise.resolve(adminServer.get('/api/material/unit/list', { params: params })),

  // 物料品牌分类
  brandList: (params) => Promise.resolve(adminServer.get('/api/material/brand/list', { params: params })),

  // 物料类别分类（新增）
  typeListAdd: (params) => Promise.resolve(adminServer.get('/api/material/type/list/three/layer', { params: params })),

  // 物料颜色分类
  colorList: (params) => Promise.resolve(adminServer.get('/api/material/color/list', { params: params })),

  // 新增物料
  addMaterial: (params) => Promise.resolve(adminServer.post('/api/material', params, { headers: { 'Content-Type': 'application/json' } })),

  // 修改物料信息
  editMaterial: (params) => Promise.resolve(adminServer.post(`/api/material/${params.id}`, params, { headers: { 'Content-Type': 'application/json' } })),

  // 修改物料状态
  changeMaterial: (params) => Promise.resolve(adminServer.put('/api/material/state', qs.stringify(params))),

  picUpload: `${staticServer}/api/statics/file/materiel`,

  picStatic: `${staticServer}/`,

};

export default Material;
