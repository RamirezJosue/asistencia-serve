const express = require('express');
const Asistencia = require('../models/asistencia');
const { verificaToken } = require('../middlewares/autenticacion')
const app = express();


app.get('/asistencia', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Asistencia.find({}, 'nombres creado_por asistencia evento fecha')
        .skip(desde)
        .limit(limite)
        .exec((err, asistencias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Asistencia.count((err, conteo) => {
                res.json({
                    ok: true,
                    asistencias,
                    cuantos: conteo
                });

            })
        });
});


//  Obtener un asistencia por ID
app.get('/asistencia/:id', (req, res) => {

    let id = req.params.id;

    Asistencia.findById(id)
        .exec((err, asistenciaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!asistenciaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                asistencia: asistenciaDB
            });

        });

});



app.post('/asistencia', (req, res) => {
    let body = req.body;
    console.log('holaaaaaaaaaaaaaaaaaa');

    let asistencia = new Asistencia({
        nombres: body.nombres,
        creado_por: body.creado_por,
        asistencia: body.asistencia,
        evento: body.evento,
        fecha: body.fecha
    });

    asistencia.save((err, asistenciaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            asistencia: asistenciaDB
        });
    });
});

app.put('/asistencia/:id', [verificaToken], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Asistencia.findById(id, (err, asistenciaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!asistenciaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        asistenciaDB.nombres = body.nombres;
        asistenciaDB.creado_por = body.creado_por;
        asistenciaDB.asistencia = body.asistencia;
        asistenciaDB.evento = body.evento;
        asistenciaDB.fecha = body.idUsuario;

        asistenciaDB.save((err, asistenciaGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                asistencia: asistenciaGuardado
            });
        });
    });
});

app.delete('/asistencia/:id', [verificaToken], (req, res) => {
    let id = req.params.id;

    Asistencia.findByIdAndRemove(id, (err, asistenciaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!asistenciaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Asistencia Borrada'
        })
    });
});




module.exports = app;