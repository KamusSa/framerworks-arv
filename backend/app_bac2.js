'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/datos-curso', (req, res) => {

  var hola = req.body.hola;

  return res.status(200).send({
    curso: 'Curso fullstack',
    author: 'Luis Antonio Aguilar',
    url: 'luis@com',
    hola
  }); 
  
});

module.exports = app;