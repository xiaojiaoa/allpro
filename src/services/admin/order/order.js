// import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {

  orderList: (params) => Promise.resolve(adminServer.get('/api/orders', { params: params })),

};

export default Taskseq;
