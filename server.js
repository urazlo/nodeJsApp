const app = require('./app');
const config = require('./config');
const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }, function (err) {
  if (err) {
    return console.error(err);
  }
  
  app.listen(config.port , function () {
    console.log(`Port number is ${config.port}`);
  });
});

