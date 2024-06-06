'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var user_routes = require('./controlador/usuarioRuta'); //Agregamos la ruta

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', user_routes); //Agregamos este para una mejor ejecucion

module.exports = app;

//app.get('/pruebas', function(req, res) {
//  res.status(200).send({ mesage: 'Bienvenido al curso Fernando Martinez' });
//})