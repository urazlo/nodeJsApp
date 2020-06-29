const crypto = require('crypto');
const config = require('../config');

// const hashingPassword = function (password, сщташп) {
//   let hash = crypto.createHmac(config.hashType, config.hashKey);
//   hash.update(password);
//   let value = hash.digest('hex');
//   return value;
// };
// module.exports = hashingPassword;

// };

module.exports = (password) => {
  return crypto
    .createHmac(config.hashType, config.hashKey)
    .update(password)
    .digest('hex');
};