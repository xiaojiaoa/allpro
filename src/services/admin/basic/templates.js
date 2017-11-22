import qs from 'qs';

import adminServer from '../../../config/server';

const Templates = {

  list: (params) => Promise.resolve(adminServer.get('/api/templet', { params: params })),

  version: (id) => Promise.resolve(adminServer.get(`/api/templet/version/${id}`)),

  content: (params) => Promise.resolve(adminServer.get(`/api/templet/${params.id}`, { params: params })),

  preview: (params) => Promise.resolve(adminServer.get(`/api/templet/preview/${params.id}`, { params: params })),

  edit: (params) => Promise.resolve(adminServer.post(`/api/templet/${params.id}`, qs.stringify(params))),

  release: (params) => Promise.resolve(adminServer.put(`/api/templet/publish/${params.id}`, qs.stringify(params))),

};

export default Templates;
