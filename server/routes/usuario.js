const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')

const app = express();


app.get('/usuario', function(req, res) {
    res.json('get Usuario')
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        user: body.user,
        clave: bcrypt.hashSync(body.clave, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // usuarioDB.clave = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    })
});

app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
});

module.exports = app;