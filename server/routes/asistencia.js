const express = require('express');
const Asistencia = require('../models/asistencia');
const { verificaToken } = require('../middlewares/autenticacion')
const app = express();


app.get('/asistencia', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Asistencia.find({}, 'codigo nombres fechahora ofline idUsuario idAlumnoMatricula idEventoprogramado')
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



app.post('/asistencia', [verificaToken], (req, res) => {
    let body = req.body;
    let asistencia = new Asistencia({
        codigo: body.codigo,
        nombres: body.nombres,
        fechahora: body.fechahora,
        ofline: body.ofline,
        idUsuario: body.idUsuario,
        idAlumnoMatricula: body.idAlumnoMatricula,
        idEventoprogramado: body.idEventoprogramado
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

        asistenciaDB.codigo = body.codigo;
        asistenciaDB.nombres = body.nombres;
        asistenciaDB.fechahora = body.fechahora;
        asistenciaDB.ofline = body.ofline;
        asistenciaDB.idUsuario = body.idUsuario;
        asistenciaDB.idAlumnoMatricula = body.idAlumnoMatricula;
        asistenciaDB.idEventoprogramado = body.idEventoprogramado;

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
