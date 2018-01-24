// import qs from 'qs';

import adminServer from '../../../config/server';

const process = {
  /*
    订单
  */
  // 拆单审核--获取可拆单审核的订单
  orderApartReviewable: (params) => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewable?isResupply=0', { params: params })),
  // 拆单审核--获取拆单审核中的订单
  orderApartReviewing: () => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewing?isResupply=0')),
  // 拆单审核--获取已拆单审核的订单
  orderApartReviewed: () => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewed?isResupply=0')),
  // 审核--获取可审核的订单
  orderReviewable: (params) => Promise.resolve(adminServer.get('/api/orders/review/reviewable?isResupply=0', { params: params })),
  // 审核--获取审核中的订单
  orderReviewing: () => Promise.resolve(adminServer.get('/api/orders/review/reviewing?isResupply=0')),
  // 审核--获取已审核的订单
  orderReviewed: () => Promise.resolve(adminServer.get('/api/orders/review/reviewed?isResupply=0')),
  // 拆单--获取可拆单的订单
  orderApartable: (params) => Promise.resolve(adminServer.get('/api/orders/apart/apartable?isResupply=0', { params: params })),
  // 拆单--获取拆单中的订单
  orderAparting: () => Promise.resolve(adminServer.get('/api/orders/apart/aparting?isResupply=0')),
  // 拆单--获取已拆单的订单
  orderAparted: () => Promise.resolve(adminServer.get('/api/orders/apart/aparted?isResupply=0')),
  //
  //
  //
  /*
    补单
  */
  // 拆单审核--获取可拆单审核的补单
  ReApartReviewable: (params) => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewable?isResupply=1', { params: params })),
  // 拆单审核--获取拆单审核中的补单
  ReApartReviewing: () => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewing?isResupply=1')),
  // 拆单审核--获取已拆单审核的补单
  ReApartReviewed: () => Promise.resolve(adminServer.get('/api/orders/apartReview/apartReviewed?isResupply=1')),
  // 审核--获取可审核的补单
  ReReviewable: (params) => Promise.resolve(adminServer.get('/api/orders/review/reviewable?isResupply=1', { params: params })),
  // 审核--获取审核中的补单
  ReReviewing: () => Promise.resolve(adminServer.get('/api/orders/review/reviewing?isResupply=1')),
  // 审核--获取已审核的补单
  ReReviewed: () => Promise.resolve(adminServer.get('/api/orders/review/reviewed?isResupply=1')),
  // 拆单--获取可拆单的补单
  ReApartable: (params) => Promise.resolve(adminServer.get('/api/orders/apart/apartable?isResupply=1', { params: params })),
  // 拆单--获取拆单中的补单
  ReAparting: () => Promise.resolve(adminServer.get('/api/orders/apart/aparting?isResupply=1')),
  // 拆单--获取已拆单的补单
  ReAparted: () => Promise.resolve(adminServer.get('/api/orders/apart/aparted?isResupply=1')),
  // 受理--获取可受理的补单
  ReAcceptable: (params) => Promise.resolve(adminServer.get('/api/orders/accept/acceptable?isResupply=1', { params: params })),
  // 受理--获取受理中的补单
  ReAccepting: () => Promise.resolve(adminServer.get('/api/orders/accept/accepting?isResupply=1')),
  // 受理--获取已受理的补单
  ReAccepted: () => Promise.resolve(adminServer.get('/api/orders/accept/accepted?isResupply=1')),
  //
  //
  //
  /*
    订单补单共用
  */
  // 获取可排料
  schedulable: (params) => Promise.resolve(adminServer.get('/api/orders/schedule/schedulable', { params: params })),
  // 获取排料中
  scheduling: () => Promise.resolve(adminServer.get('/api/orders/schedule/scheduling')),
  // 获取已排料
  scheduled: () => Promise.resolve(adminServer.get('/api/orders/schedule/scheduled')),
};

export default process;

