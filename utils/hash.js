const crypto = require('crypto');
// const config = require('../config');
const hashingPassword = function (password, salt) {
  let hash = crypto.createHmac('md5', salt);
  hash.update(password);
  let value = hash.digest('hex');
  return value;
};
module.exports = hashingPassword;

// };
// module.exports = (password) => {
//   return crypto
//     .createHmac('md5', 'secret')
//     .update(password)
//     .digest('hex');
// };