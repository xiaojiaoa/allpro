import qs from 'qs';

import adminServer from '../../../config/server';

const Taskseq = {

  list: (params) => Promise.resolve(adminServer.get('/api/taskseq/measure/page', { params: params })),

  spaceInfo: (params) => Promise.resolve(adminServer.get('/api/assist/taskseq/spaceinfo', { params: params })),

  individualDetail: (id) => Promise.resolve(adminServer.get(`/api/customers/comm/${id}`)),

  measure: (params) => Promise.resolve(adminServer.post('/api/taskseq/measure', qs.stringify(params))),

  designer: () => Promise.resolve(adminServer.get('/api/store/employee/designer')),

  detailBase: (id) => Promise.resolve(adminServer.get(`/api/taskseq/sequence/${id}/base`)),

  detailMeasure: (id) => Promise.resolve(adminServer.get(`/api/taskseq/measure/${id}`)),

  detailFile: (id) => Promise.resolve(adminServer.get(`/api/taskseq/file/${id}/list`)),

  detailWardround: (id) => Promise.resolve(adminServer.get(`/api/taskseq/wardround/${id}/list`)),

  detailTouch: (id) => Promise.resolve(adminServer.get(`/api/taskseq/touch/${id}/list`)),

  detailContracts: (id) => Promise.resolve(adminServer.get(`/api/contracts/${id}`)),

  detailCommunication: (id) => Promise.resolve(adminServer.get(`/api/taskseq/communication/${id}/list`)),

};

export default Taskseq;

