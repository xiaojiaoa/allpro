import qs from 'qs';

import adminServer from '../../../config/server';

const Store = {

  list: (params) => Promise.resolve(adminServer.get('/api/store', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/store/${id}`)),

  edit: (params) => Promise.resolve(adminServer.post('/api/store/employee', qs.stringify(params))),

};

export default Store;
