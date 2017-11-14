// import qs from 'qs';

import adminServer from '../../../config/server';

const Config = {
  menu: () => Promise.resolve(adminServer.get('/api/organ/permissions/menus')),

  employee: () => Promise.resolve(adminServer.get('/api/employee/detail')),
};

export default Config;
