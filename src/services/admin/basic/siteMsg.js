// import qs from 'qs';

import adminServer from '../../../config/server';

const SiteMsg = {
  msgList: (params) => Promise.resolve(adminServer.get('/api/messages/list', { params: params })),

};

export default SiteMsg;
