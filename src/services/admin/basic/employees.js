import qs from 'qs';

import adminServer from '../../../config/server';

const Employees = {
  list: (params) => Promise.resolve(adminServer.get('/api/employee', { params: params })),

  listOfStore: (params) => Promise.resolve(adminServer.get('/api/store/employee', { params: params })),

  employeeList: (id) => Promise.resolve(adminServer.get(`/api/store/employee?bid=${id}`)),

  detail: (id) => Promise.resolve(adminServer.get(`/api/employee/${id}`)),

  add: (params) => Promise.resolve(adminServer.post('/api/employee', qs.stringify(params))),

  edit: (id, params) => Promise.resolve(adminServer.put(`/api/employee/${id}`, qs.stringify(params))),

  educationInfo: () => Promise.resolve(adminServer.get('/api/assist/education')),

  departmentInfo: () => Promise.resolve(adminServer.get('/api/department')),

  mapCountryInfo: () => Promise.resolve(adminServer.get('/api/assist/areacode')),

  mapInfo: (val) => Promise.resolve(adminServer.get(`/api/assist/areacode?id=${val}`)),

  roleInfo: () => Promise.resolve(adminServer.get('/api/organ/role/simple')),

  resetPassword: (id) => Promise.resolve(adminServer.put(`/api/employee/password/${id}`)),

  lockAccounts: (id) => Promise.resolve(adminServer.put(`/api/employee/state/${id}`)),

  changePassword: (params) => Promise.resolve(adminServer.put('/api/employee/password', qs.stringify(params))),

};

export default Employees;

