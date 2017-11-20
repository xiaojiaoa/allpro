import adminServer from '../../../config/server';

const Role = {

  list: (params) => Promise.resolve(adminServer.get('/api/role/simple', { params: params })),

};

export default Role;
