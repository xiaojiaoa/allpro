import qs from 'qs';
import adminServer, { staticServer, staticServerAxios } from '../../../config/server';

const Purchase = {
  // 图片上传
  FileUpload: `${staticServer}/api/statics/file/share`,

  supList: (params) => Promise.resolve(adminServer.get('/api/supplier', { params: params })),

  supMateList: (params) => Promise.resolve(adminServer.get('/api/material/purchasable', { params: params })),

  supSort: (parentId) => Promise.resolve(adminServer.get(`/api/suppliers/category/list?parentId=${parentId}`)),

  supAdd: (params) => Promise.resolve(adminServer.post('/api/supplier', qs.stringify(params))),

  supMateAdd: (params) => Promise.resolve(adminServer.post('/api/supplier/materials', params, { headers: { 'Content-Type': 'application/json' } })),

  supDetail: (id) => Promise.resolve(adminServer.get(`/api/supplier/${id}`)),

  supFileData: (id) => Promise.resolve(adminServer.get(`/api/supp/file/request?reqId=${id}`)),

  supUpload: (params) => Promise.resolve(adminServer.post('/api/supp/file', params, { headers: { 'Content-Type': 'application/json' } })),

  supEdit: (id, params) => Promise.resolve(adminServer.put(`/api/supplier/${id}`, qs.stringify(params))),

  supMateEdit: (params) => Promise.resolve(adminServer.put('/api/supplier/materials', qs.stringify(params))),

  supMateDel: (params) => Promise.resolve(adminServer.delete('/api/supplier/materials', params, { headers: { 'Content-Type': 'application/json' } })),

  supForbid: (id, isDeleted) => Promise.resolve(adminServer.put(`/api/supplier/isDeleted/${id}?isDeleted=${isDeleted}`)),

  supSortList: (params) => Promise.resolve(adminServer.get('/api/suppliers/category', { params: params })),

  supSortAdd: (params) => Promise.resolve(adminServer.post('/api/suppliers/category', qs.stringify(params))),

  supSortEdit: (id, params) => Promise.resolve(adminServer.put(`/api/suppliers/category/${id}`, qs.stringify(params))),

  supSortForbid: (id, isDeleted) => Promise.resolve(adminServer.put(`/api/suppliers/category/isDeleted/${id}?isDeleted=${isDeleted}`)),

  reqList: (params) => Promise.resolve(adminServer.get('/api/request', { params: params })),

  reqDetail: (id) => Promise.resolve(adminServer.get(`/api/request/${id}`)),

  supMateAbleList: (params) => Promise.resolve(adminServer.get('/api/supplier/materials/page', { params: params })),

  reqAdd: (params) => Promise.resolve(adminServer.post('/api/request', params, { headers: { 'Content-Type': 'application/json' } })),

  reqSuppEdit: (params) => Promise.resolve(adminServer.put('/api/request', params, { headers: { 'Content-Type': 'application/json' } })),

  reqReview: (id) => Promise.resolve(adminServer.put(`/api/request/review?reqId=${id}`)),

  reqBuildPur: (id) => Promise.resolve(adminServer.post(`/api/request/submit?reqId=${id}`)),

  reqDel: (id) => Promise.resolve(adminServer.delete(`/api/request?reqIds=${id}`)),

  purchaseList: (params) => Promise.resolve(adminServer.get('/api/purchase', { params: params })),

  purchaseDetail: (id) => Promise.resolve(adminServer.get(`/api/purchase/${id}`)),

  purchaseAdd: (params) => Promise.resolve(adminServer.post('/api/purchase', params, { headers: { 'Content-Type': 'application/json' } })),

  purchaseConcat: (id) => Promise.resolve(adminServer.post(`/api/purchase/merge?ids=${id}`)),

  purchaseConcatRecall: (id) => Promise.resolve(adminServer.post(`/api/purchase/merge/cancel?ids=${id}`)),

  purchaseReview: (id) => Promise.resolve(adminServer.put(`/api/purchase/review?ids=${id}`)),

  purchaseRecall: (id) => Promise.resolve(adminServer.put(`/api/purchase/review/cancel?ids=${id}`)),

  purchaseSubmit: (id) => Promise.resolve(adminServer.put(`/api/purchase/submit?ids=${id}`)),

  purchaseDel: (id) => Promise.resolve(adminServer.delete(`/api/purchase/delete?ids=${id}`)),

  purContractList: (params) => Promise.resolve(adminServer.get('/api/purc/contract', { params: params })),

  purContractDetai: (id) => Promise.resolve(adminServer.get(`/api/purc/contract/${id}`)),

  purContractAdd: (params) => Promise.resolve(adminServer.post('/api/purc/contract', qs.stringify(params))),

  purContractReview: (id) => Promise.resolve(adminServer.put(`/api/purc/contract/review?ids=${id}`)),

  purContractDel: (id) => Promise.resolve(adminServer.delete(`/api/purc/contract?ids=${id}`)),

  purContractRecall: (id) => Promise.resolve(adminServer.put(`/api/purc/contract/review/cancel?ids=${id}`)),

  purContractSubmit: (id) => Promise.resolve(adminServer.put(`/api/purc/contract/submit?ids=${id}`)),

  purContractEdit: (params) => Promise.resolve(adminServer.put('/api/purc/contract', qs.stringify(params))),

  purchaseRecieveList: (id) => Promise.resolve(adminServer.get(`/api/purchase/list?purcId=${id}`)),

  purRecieveList: (params) => Promise.resolve(adminServer.get('/api/purc/receiving', { params: params })),

  purRecieveDetail: (id) => Promise.resolve(adminServer.get(`/api/purc/receiving/${id}`)),

  purReceiveAdd: (params) => Promise.resolve(adminServer.post('/api/purc/receiving', params, { headers: { 'Content-Type': 'application/json' } })),

  purReceiveReview: (id) => Promise.resolve(adminServer.put(`/api/purc/receiving/review?ids=${id}`)),

  purReceiveRecall: (id) => Promise.resolve(adminServer.put(`/api/purc/receiving/review/cancel?ids=${id}`)),

  purReceiveDel: (id) => Promise.resolve(adminServer.delete(`/api/purc/receiving?ids=${id}`)),

  purReceiveSubmit: (id) => Promise.resolve(adminServer.put(`/api/purc/receiving/submit?ids=${id}`)),

  purReceiveEdit: (params) => Promise.resolve(adminServer.put('/api/purc/receiving', params, { headers: { 'Content-Type': 'application/json' } })),

  purchaseCheckDetail: (id) => Promise.resolve(adminServer.get(`/api/purc/receiving/list?receId=${id}`)),

  purCheckAdd: (params) => Promise.resolve(adminServer.post('/api/purc/check', qs.stringify(params))),

  purCheckList: (params) => Promise.resolve(adminServer.get('/api/purc/check', { params: params })),

  purCheckDetail: (id) => Promise.resolve(adminServer.get(`/api/purc/check/${id}`)),

  purCheckReview: (id) => Promise.resolve(adminServer.put(`/api/purc/check/review?ids=${id}`)),

  purDownLoad: (id) => Promise.resolve(adminServer.get(`/api/supp/file/purchase?purcId=${id}`)),

  purZipDownLoad: (params) => Promise.resolve(staticServerAxios.post('/zipDownload', params, { responseType: 'arraybuffer' }, { headers: { 'Content-Type': 'application/json' } })),

};

export default Purchase;
