import qs from 'qs';

import adminServer from '../../../config/server';

const Touch = {

  keypoints: () => Promise.resolve(adminServer.get('/api/assist/taskflow/keypoint')),

  touchSubmit: (params) => Promise.resolve(adminServer.post('/api/taskflow/touch/store', qs.stringify(params))),

  communication: (params) => Promise.resolve(adminServer.post('/api/taskflow/communication/store', qs.stringify(params))),

};

export default Touch;

