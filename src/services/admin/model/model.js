import qs from 'qs';

import adminServer from '../../../config/server';

const model = {
  get: () => Promise.resolve(adminServer.get('api')),

  put: (params) => Promise.resolve(adminServer.put('api', qs.stringify(params))),

  post: (params) => Promise.resolve(adminServer.post('api', qs.stringify(params))),

  delete: (params) => Promise.resolve(adminServer.delete('api', { params: params })),

};

export default {
  model,
};
