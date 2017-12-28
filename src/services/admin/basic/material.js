import qs from 'qs';

import adminServer from '../../../config/server';

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

};

export default Material;
