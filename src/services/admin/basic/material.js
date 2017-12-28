// import qs from 'qs';

import adminServer from '../../../config/server';

const Material = {
  // 物料列表
  list: (params) => Promise.resolve(adminServer.get('/api/material', { params: params })),
  // 物料分类列表
  typeList: (params) => Promise.resolve(adminServer.get('/api/material/type/list', { params: params })),

};

export default Material;
