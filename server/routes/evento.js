const express = require('express');
const Evento = require('../models/evento');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/evento', [verificaToken, verificaAdmin_Role], (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    Evento.find({}, 'nombre nombre_corto facultad')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, eventos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Evento.count((err, length) => {
                res.json({
                    ok: true,
                    eventos,
                    length
                });
            })
        });
});

//  Obtener un evento por ID
app.get('/evento/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Evento.findById(id)
        .exec((err, eventoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!eventoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                evento: eventoDB
            });

        });

});


app.post('/evento', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let evento = new Evento({
        nombres: body.nombre,
        nombre_corto: body.nombre_corto,
        facultad: body.facultad
    });

    evento.save((err, eventoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            evento: eventoDB
        });
    });
});

app.put('/evento/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Evento.findById(id, (err, eventoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!eventoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        eventoDB.nombre = body.nombre;
        eventoDB.nombre_corto = body.nombre_corto;
        eventoDB.facultad = body.facultad;

        eventoDB.save((err, eventoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                evento: eventoGuardado
            });
        });
    });
});

app.delete('/evento/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Evento.findByIdAndRemove(id, (err, eventoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!eventoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Evento Borrada'
        })
    });
});




module.exports = app;
