// import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {

  list: (params) => Promise.resolve(adminServer.get('/api/taskseq/measure/page', { params: params })),

};

export default Taskseq;

