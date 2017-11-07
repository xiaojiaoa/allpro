import qs from 'qs';

import adminServer from '../../../config/server';

const Employees = {

  list: (params) => Promise.resolve(adminServer.get('/api/store/employee', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/store/employee/${id}`)),

  edit: (params) => Promise.resolve(adminServer.post('/api/store/employee', qs.stringify(params))),

};

export default Employees;
