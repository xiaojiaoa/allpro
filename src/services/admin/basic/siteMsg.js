// import qs from 'qs';

import adminServer from '../../../config/server';

const NoticeInfo = {
  list: (params) => Promise.resolve(adminServer.get('/api/store/doc/share/page/org', { params: params })),

  storeInfo: (params) => Promise.resolve(adminServer.get('/api/assist/store/types', { params: params })),

  placeInfo: (params) => Promise.resolve(adminServer.get('/api/assist/store/addrTypes', { params: params })),

  orgInfo: (params) => Promise.resolve(adminServer.get('/api/assist/organ/types', { params: params })),

  noticeTypes: (params) => Promise.resolve(adminServer.get('/api/assist/notice/types', { params: params })),

  add: (params) => Promise.resolve(adminServer.post('/api/store/doc/share', params, { headers: { 'Content-Type': 'application/json' } })),

  detail: (id) => Promise.resolve(adminServer.get(`/api/store/doc/share/${id}`)),

  delete: (id) => Promise.resolve(adminServer.put(`/api/store/doc/share/${id}`)),

  edit: (params) => Promise.resolve(adminServer.post('/api/store/doc/share/update', params, { headers: { 'Content-Type': 'application/json' } })),

  msgList: (params) => Promise.resolve(adminServer.get('/api/messages/list', { params: params })),

};

export default NoticeInfo;
