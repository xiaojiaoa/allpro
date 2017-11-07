// import qs from 'qs';

import adminServer from '../../../config/server';

const Config = {
  menu: () => Promise.resolve(adminServer.get('/api/permissions/menus')),

  employee: () => Promise.resolve(adminServer.get('/api/store/employee/detail')),
};

export default Config;
