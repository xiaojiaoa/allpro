import qs from 'qs';

import adminServer from '../../../config/server';

const Organization = {

  list: (params) => Promise.resolve(adminServer.get('/api/organization', { params: params })),

  cliquesList: (params) => Promise.resolve(adminServer.get('/api/organization/clique', { params: params })),

  children: (params) => Promise.resolve(adminServer.get(`/api/organization/${params.id}`, { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/organization/${id}`)),

  add: (params) => Promise.resolve(adminServer.post('/api/organization', qs.stringify(params))),

  edit: (params) => Promise.resolve(adminServer.put(`/api/organization/${params.id}`, qs.stringify(params))),

  state: (params) => Promise.resolve(adminServer.put(`/api/organization/state/${params.id}`, qs.stringify(params))),

  selectList: () => Promise.resolve(adminServer.get('/api/organization/list')),

};

export default Organization;
