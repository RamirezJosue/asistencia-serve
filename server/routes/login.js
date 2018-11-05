const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const app = express();

app.post('/login', (req, res) => {

            let body = req.body;
            Usuario.findOne({ user: body.user }).
            populate('persona').
            exec(function(err, usuarioDB) {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                if (!usuarioDB) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "Usuario o contraseña incorrectos"
                        }
                    });
                }

                if (!bcrypt.compareSync(body.clave, usuarioDB.clave)) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: "Usuario o contraseñas incorrectos"
                        }
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.json({
                    ok: true,
                    usuario: usuarioDB,
                    id: usuarioDB._id,
                    token
                });

            });


            module.exports = app;