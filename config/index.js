const _defaultsDeep = require('lodash/defaultsDeep');
const env = process.env.NODE_ENV || 'development';
const defaultsConfig = require('./defaultConfig.json');

let localConfig = {};
try {
  localConfig = require('./localConfig.json');
} catch (err) {
  console.log(err);
  console.warn('There is no localConfig.json file!');
}

const config = _defaultsDeep(localConfig, defaultsConfig);

module.exports = config[env];
