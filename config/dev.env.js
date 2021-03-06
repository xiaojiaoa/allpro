const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ADMIN_SERVER: '"http://192.2.17.130:8076"',
  // ADMIN_SERVER: '"http://192.2.17.130:8076"',
  // ADMIN_SERVER: '"http://192.2.17.63:8076"',
  // ADMIN_SERVER: '"http://192.2.17.189:8076"',
  WEBSOCKET_SERVER: '"http://192.2.17.74:8056"',
  STATIC_SERVER: '"http://192.2.17.74:8088"',
});
