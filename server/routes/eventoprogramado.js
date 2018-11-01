const express = require('express');
const Eventoprogramado = require('../models/eventoprogramado');
const { verificaToken } = require('../middlewares/autenticacion')
const app = express();


// ===========================
//  Obtener eventoprogramados
// ===========================
app.get('/eventoprogramado', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Eventoprogramado.find({}, 'fecha horainicio horafin idEvento')
        .skip(desde)
        .limit(limite)
        .exec((err, eventoprogramados) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Eventoprogramado.count((err, conteo) => {
                res.json({
                    ok: true,
                    eventoprogramados,
                    cuantos: conteo
                });

            })
        });
});


// ===========================
//  Obtener un eventoprogramado por ID
// ===========================
app.get('/eventoprogramados/:id', (req, res) => {
    // populate: usuario categoria
    // paginado
    let id = req.params.id;

    eventoprogramadoSchema.findById(id)
        .populate('evento', 'nombreevento')
        .exec((err, eventoprogramadoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!eventoprogramadoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                eventoprogramado: eventoprogramadoDB
            });

        });

});

// ===========================
//  Buscar eventoprogramados
// ===========================
app.get('/eventoprogramados/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    eventoprogramadoSchema.find({ nombre: regex })
        .populate('evento', 'nombreevento')
        .exec((err, eventoprogramados) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                eventoprogramados
            })

        })


});



// ===========================
//  Crear un nuevo eventoprogramado
// ===========================
app.post('/eventoprogramados', verificaToken, (req, res) => {
    // grabar el usuario

    let body = req.body;

    let eventoprogramado = new eventoprogramadoSchema({
        fecha: req.fecha,
        horainicio: body.horainicio,
        horafin: body.horafin,
        idEvento: body.idEvento
    });

    eventoprogramado.save((err, eventoprogramadoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.status(201).json({
            ok: true,
            eventoprogramado: eventoprogramadoDB
        });

    });

});

// ===========================
//  Actualizar un eventoprogramado
// ===========================
app.put('/eventoprogramados/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;

    eventoprogramadoSchema.findById(id, (err, eventoprogramadoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!eventoprogramadoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        eventoprogramadoDB.fecha = body.fecha;
        eventoprogramadoDB.horainicio = body.horainicio;
        eventoprogramadoDB.horafin = body.horafin;
        eventoprogramadoDB.idEvento = body.idEvento;
        eventoprogramadoDB.save((err, eventoprogramadoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                eventoprogramado: eventoprogramadoGuardado
            });

        });

    });


});

// ===========================
//  Borrar un eventoprogramado
// ===========================
app.delete('/eventoprogramados/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    eventoprogramadoSchema.findById(id, (err, eventoprogramadoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!eventoprogramadoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        eventoprogramadoDB.disponible = false;

        eventoprogramadoDB.save((err, eventoprogramadoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                eventoprogramado: eventoprogramadoBorrado,
                mensaje: 'eventoprogramadoSchema borrado'
            });

        })

    })


});






module.exports = app;
