import qs from 'qs';
import adminServer from '../../../config/server';

const Role = {

  list: (params) => Promise.resolve(adminServer.get('/api/role', { params: params })),

  cliqueList: (params) => Promise.resolve(adminServer.get('/api/organization/list/clique', { params: params })),

  organList: (id) => Promise.resolve(adminServer.get(`/api/organization/list/${id}`)),

  roleTypeList: (scope) => Promise.resolve(adminServer.get(`/api/assist/role/types/${scope}`)),

  permissionList: (scope) => Promise.resolve(adminServer.get(`/api/permissions/list/${scope}`)),

  create: (params) => Promise.resolve(adminServer.post('/api/role', qs.stringify(params))),

};

export default Role;
