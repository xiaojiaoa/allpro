import qs from 'qs';

import adminServer from '../../../config/server';

const Employees = {
  // 员工
  list: (params) => Promise.resolve(adminServer.get('/api/employee', { params: params })),

  // 根据集团id获取机构列表
  organization: (id) => Promise.resolve(adminServer.get(`/api/organization/list/${id}`)),

  listOfStore: (params) => Promise.resolve(adminServer.get('/api/store/employee', { params: params })),
  // 获取机构员工详情
  detail: (id) => Promise.resolve(adminServer.get(`/api/employee/${id}`)),
  // 获取门店员工详情
  detailStore: (id) => Promise.resolve(adminServer.get(`/api/store/employee/${id}`)),
  // 新增机构员工
  add: (params) => Promise.resolve(adminServer.post('/api/employee', qs.stringify(params))),
  // 新增门店员工
  addStore: (params) => Promise.resolve(adminServer.post('/api/store/employee', qs.stringify(params))),
  // 编辑机构员工
  edit: (params) => Promise.resolve(adminServer.put(`/api/employee/${params.id}`, qs.stringify(params))),
  // 编辑门店员工
  editStore: (params) => Promise.resolve(adminServer.put(`/api/store/employee/${params.id}`, qs.stringify(params))),
  // 部门
  departmentInfo: (params) => Promise.resolve(adminServer.get('/api/department', { params: params })),
  // 角色
  roleInfo: (params) => Promise.resolve(adminServer.get('/api/organ/role/simple', { params: params })),
  // 机构重置密码
  resetPassword: (id) => Promise.resolve(adminServer.put(`/api/employee/password/${id}`)),
  // 门店重置密码
  resetPasswordStore: (id) => Promise.resolve(adminServer.put(`/api/store/employee/password/${id}`)),
  // 机构更改账号状态
  lockAccounts: (params) => Promise.resolve(adminServer.put(`/api/employee/state/${params.id}`, qs.stringify(params))),
  // 门店更改账号状态
  lockAccountsStore: (params) => Promise.resolve(adminServer.put(`/api/store/employee/state/${params.id}`, qs.stringify(params))),

  changePassword: (params) => Promise.resolve(adminServer.put('/api/employee/password', qs.stringify(params))),

};

export default Employees;

