// import qs from 'qs';

import adminServer from '../../../config/server';

const Customers = {

  list: (params) => Promise.resolve(adminServer.get('/api/customers/org/page', { params: params })),

  individualDetail: (id) => Promise.resolve(adminServer.get(`/api/customers/comm/${id}`)),

  enterpriseDetail: (id) => Promise.resolve(adminServer.get(`/api/customers/entp/${id}`)),

};

export default Customers;
