import qs from 'qs';

import adminServer from '../../../config/server';

const Organization = {

  list: (params) => Promise.resolve(adminServer.get('/api/organization', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/organization/${id}`)),

  edit: (params) => Promise.resolve(adminServer.post('/api/employee', qs.stringify(params))),

};

export default Organization;
