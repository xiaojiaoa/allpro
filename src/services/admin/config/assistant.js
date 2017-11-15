// import qs from 'qs';

import adminServer from '../../../config/server';

const Assistant = {
  address: (params) => Promise.resolve(adminServer.get('/api/assist/areacode', { params: params })),
};

export default Assistant;
