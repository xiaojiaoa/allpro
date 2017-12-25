// import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {
  // 获取流水列表
  list: (params) => Promise.resolve(adminServer.get('/api/taskflow/flow/page', { params: params })),
  // 根据门店号获取设计师
  designer: (bid) => Promise.resolve(adminServer.get(`/api/store/employee/designer/${bid}`)),

};

export default Taskseq;

