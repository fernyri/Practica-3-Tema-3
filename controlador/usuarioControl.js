'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosModelo = require('../modelo/usuarios');

async function accesoUsuario(req, res) {
    const { email, password, gethash } = req.body;

    try {
        const usuario = await usuariosModelo.findOne({ email: email });

        if (!usuario) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (passwordMatch) {
            console.log('Coincide el password');
            if (gethash) {
                const token = jwt.sign({ user: usuario }, 'tu_secreto', { expiresIn: '1h' });
                return res.status(200).send({ user: usuario, token: token });
            } else {
                return res.status(200).send({ user: usuario });
            }
        } else {
            return res.status(404).send({ message: 'El usuario no se ha identificado' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en la petición' });
    }
}

function prueba(req, res) {
    res.status(200).send({
        mesagge: 'Probando una acción del controlador de usuarios del api REST con node y mongo'
    });
}

async function registrarUsuario(req, res) {
    const usuario = new usuariosModelo();

    const { nombre, apellido, email, password } = req.body;
    console.log(req.body);

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.rol = 'ROLE_USER';
    usuario.imagen = 'null';

    if (password) {
        try {
            usuario.password = await bcrypt.hash(password, 10);
            if (nombre && apellido && email) {
                const usuarioAlmacenado = await usuario.save();
                if (!usuarioAlmacenado) {
                    return res.status(404).send({ message: 'No se ha registrado el usuario' });
                } else {
                    return res.status(200).send({ usuario: usuarioAlmacenado });
                }
            } else {
                return res.status(400).send({ message: 'Introduce todos los campos' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error al guardar el usuario', error: err.message });
        }
    } else {
        return res.status(400).send({ message: 'Introduce la contraseña' });
    }
}

function eliminar(req, res) {
    var idUs = req.params.id;
    usuariosModelo.findByIdAndRemove(idUs, (err, us) => {
        if (err) {
            res.status(500).send("Usuario no eliminado");
        } else {
            res.status(200).json({ usuario: us });
        }
    });
}

module.exports = {
    prueba,
    registrarUsuario,
    accesoUsuario,
    eliminar
};