'use strict'

var express = require('express');
var UsuarioControl = require('../controlador/usuarioControl');

var api = express.Router();

api.get('/probando-controlador', UsuarioControl.prueba);
api.post('/registro', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);
api.post('/delete', UsuarioControl.eliminar);
module.exports = api;