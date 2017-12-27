import qs from 'qs';
import adminServer from '../../../config/server';

const Role = {

  list: (params) => Promise.resolve(adminServer.get('/api/role', { params: params })),

  organList: (id) => Promise.resolve(adminServer.get(`/api/organization/list/${id}`)),

  roleTypeList: (scope) => Promise.resolve(adminServer.get(`/api/assist/role/types/${scope}`)),

  permissionList: (scope) => Promise.resolve(adminServer.get(`/api/permissions/list/${scope}`)),

  create: (params) => Promise.resolve(adminServer.post('/api/role', qs.stringify(params))),

  modify: (params) => Promise.resolve(adminServer.put('/api/role', qs.stringify(params))),

  del: (id, params) => Promise.resolve(adminServer.put(`/api/role/state/${id}`, qs.stringify(params))),

  detail: (id) => Promise.resolve(adminServer.get(`/api/role/detail/${id}`)),

};

export default Role;
