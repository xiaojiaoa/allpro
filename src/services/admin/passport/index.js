import qs from 'qs';

import adminServer from '../../../config/server';

const Passport = {
  login: (params) => Promise.resolve(adminServer.post('/api/auth/login', qs.stringify(params))),
};

export default Passport;
