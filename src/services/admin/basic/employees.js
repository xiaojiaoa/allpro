import qs from 'qs';

import adminServer from '../../../config/server';

const Employees = {
  // 员工
  list: (params) => Promise.resolve(adminServer.get('/api/employee', { params: params })),

  // 根据集团id获取机构列表
  organization: (id) => Promise.resolve(adminServer.get(`/api/organization/list/${id}`)),

  listOfStore: (params) => Promise.resolve(adminServer.get('/api/store/employee', { params: params })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/employee/${id}`)),
  // 新增机构员工
  add: (params) => Promise.resolve(adminServer.post('/api/employee', qs.stringify(params))),
  // 新增门店员工
  addStore: (params) => Promise.resolve(adminServer.post('/api/store/employee', qs.stringify(params))),
  // 编辑机构员工
  edit: (params) => Promise.resolve(adminServer.put(`/api/employee/${params.id}`, qs.stringify(params))),
  // 编辑门店员工
  editStore: (params) => Promise.resolve(adminServer.put(`/api/store/employee/${params.id}`, qs.stringify(params))),

  departmentInfo: () => Promise.resolve(adminServer.get('/api/department')),

  roleInfo: (params) => Promise.resolve(adminServer.get('/api/organ/role/simple', { params: params })),

  resetPassword: (id) => Promise.resolve(adminServer.put(`/api/employee/password/${id}`)),

  lockAccounts: (id, params) => Promise.resolve(adminServer.put(`/api/employee/state/${id}`, qs.stringify(params))),

  changePassword: (params) => Promise.resolve(adminServer.put('/api/employee/password', qs.stringify(params))),

};

export default Employees;

