import qs from 'qs';

import adminServer from '../../../config/server';

const Department = {

  list: (params) => Promise.resolve(adminServer.get('/api/department', { params: params })),

  add: (params) => Promise.resolve(adminServer.post('/api/department', qs.stringify(params))),

  delete: (params) => Promise.resolve(adminServer.put(`/api/department/state/${params.id}`, qs.stringify(params))),

  mod: (params) => Promise.resolve(adminServer.put(`/api/department/${params.ID}`, qs.stringify(params))),

  listByStore: (id, params) => Promise.resolve(adminServer.get(`/api/store/department/${id}`, { params: params })),

  listByOrgan: (id, params) => Promise.resolve(adminServer.get(`/api/department/${id}`, { params: params })),

  detailstore: (id) => Promise.resolve(adminServer.get(`/api/store/department/detail/${id}`)),

  detailorgan: (id) => Promise.resolve(adminServer.get(`/api/department/detail/${id}`)),

};

export default Department;
