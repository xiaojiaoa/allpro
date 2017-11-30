import qs from 'qs';

import adminServer from '../../../config/server';

const Store = {

  list: (params) => Promise.resolve(adminServer.get('/api/store', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/store/${id}`)),

  add: (params) => Promise.resolve(adminServer.post('/api/store', qs.stringify(params))),

  edit: (id, params) => Promise.resolve(adminServer.put(`/api/store/${id}`, qs.stringify(params))),

  region: (id) => Promise.resolve(adminServer.get(`/api/assist/region/types?parentId=${id}`)),

  forbid: (bid, state) => Promise.resolve(adminServer.put(`/api/store/state/${bid}?state=${state}`)),

  byOrganization: (id, params) => Promise.resolve(adminServer.get(`/api/store/page/${id}`, { params: params })),
};

export default Store;
