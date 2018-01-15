import qs from 'qs';

import adminServer from '../../../config/server';

const Order = {

  orderList: (params) => Promise.resolve(adminServer.get('/api/orders', { params: params })),

  // 新增订单类型
  addOrderType: (params) => Promise.resolve(adminServer.post('/api/orders/config/orderType', qs.stringify(params))),

  // 修改订单类型
  editOrderType: (params) => Promise.resolve(adminServer.put('/api/orders/config/orderType', qs.stringify(params))),

};

export default Order;
