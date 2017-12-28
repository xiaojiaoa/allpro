import qs from 'qs';

import adminServer from '../../../config/server';

const Material = {
  // 物料列表
  list: (params) => Promise.resolve(adminServer.get('/api/material', { params: params })),
  // 物料分类列表
  typeList: (params) => Promise.resolve(adminServer.get('/api/material/type/list', { params: params })),
  // 修改物料分类
  editType: (params) => Promise.resolve(adminServer.put(`/api/material/type/${params.id}`, qs.stringify(params))),
  // 修改物料分类状态
  deleteType: (id) => Promise.resolve(adminServer.put(`/api/material/type/stcode/${id}?stcode=0`)),

  // 物料单位分类
  unitList: (params) => Promise.resolve(adminServer.get('/api/material/unit/list', { params: params })),

  // 物料品牌分类
  brandList: (params) => Promise.resolve(adminServer.get('/api/material/brand/list', { params: params })),

  // 物料颜色分类
  colorList: (params) => Promise.resolve(adminServer.get('/api/material/color/list', { params: params })),

};

export default Material;
