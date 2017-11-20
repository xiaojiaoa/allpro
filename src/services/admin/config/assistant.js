// import qs from 'qs';

import adminServer from '../../../config/server';

const Assistant = {
  /*
    地区接口，获取省市区
    params:  id
    */
  address: (id) => Promise.resolve(adminServer.get('/api/assist/areacode', { params: id })),

  /*
    获取大区信息
    params:  parentId
    */
  region: (parentId) => Promise.resolve(adminServer.get('/api/assist/region/types', { params: parentId })),

  /*
    获取门店类型
    */
  store: () => Promise.resolve(adminServer.get('/api/assist/store/types')),

  /*
    获取经营类型
    */
  addrTypes: () => Promise.resolve(adminServer.get('/api/assist/store/addrTypes')),

  /*
    获取机构类型
    */
  organ: () => Promise.resolve(adminServer.get('/api/assist/organ/types')),

  /*
    获取可用学历信息
    */
  education: () => Promise.resolve(adminServer.get('/api/assist/education')),
};

export default Assistant;