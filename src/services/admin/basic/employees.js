import qs from 'qs';

import adminServer from '../../../config/server';

const Employees = {
  list: (params) => Promise.resolve(adminServer.get('/api/employee', { params: params })),

  listOfStore: (params) => Promise.resolve(adminServer.get('/api/store/employee', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/employee/${id}`)),

  add: (params) => Promise.resolve(adminServer.post('/api/employee', qs.stringify(params))),

  edit: (params) => Promise.resolve(adminServer.put(`/api/employee/${params.id}`, qs.stringify(params))),

  departmentInfo: () => Promise.resolve(adminServer.get('/api/department')),

  roleInfo: () => Promise.resolve(adminServer.get('/api/organ/role/simple')),

  resetPassword: (id) => Promise.resolve(adminServer.put(`/api/employee/password/${id}`)),

  lockAccounts: (id, params) => Promise.resolve(adminServer.put(`/api/employee/state/${id}`, qs.stringify(params))),

  changePassword: (params) => Promise.resolve(adminServer.put('/api/employee/password', qs.stringify(params))),

};

export default Employees;

