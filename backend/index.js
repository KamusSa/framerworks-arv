'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var portApp = '3900';

const url = 'mongodb://';
const server = 'localhost:';
const port = '27017';
const bd = '/api_rest_blog'

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(url+server+port+bd, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Conexión a Mongoose correctamente!');  

  app.listen(portApp, () => {
    console.log('Servidor corriendo en: http://localhost:' + portApp);

  })

})