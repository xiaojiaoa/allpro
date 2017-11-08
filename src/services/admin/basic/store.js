import qs from 'qs';

import adminServer from '../../../config/server';

const Store = {

  list: (params) => Promise.resolve(adminServer.get('/api/store', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/store/${id}`)),

  edit: (params) => Promise.resolve(adminServer.post('/api/store', qs.stringify(params))),

  select: (id) => Promise.resolve(adminServer.get(`/api/assist/areacode?id=${id}`)),

  region: (id) => Promise.resolve(adminServer.get(`/api/assist/region/types?parentId=${id}`)),

  organization: (params) => Promise.resolve(adminServer.get('/api/organization/list', { params: params })),

  storeTypes: (params) => Promise.resolve(adminServer.get('/api/assist/store/types', { params: params })),

  addrTypes: (params) => Promise.resolve(adminServer.get('/api/assist/store/addrTypes', { params: params })),

};

export default Store;
