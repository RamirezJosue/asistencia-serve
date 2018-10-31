const express = require('express');
const Periodo = require('../models/periodo');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion') 

const app = express();

app.get('/periodo', [verificaToken, verificaAdmin_Role], (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Periodo.find({}, 'periodo fechaInicio fechaFin')
        .skip(desde)
        .limit(limite)
        .exec((err, periodos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Periodo.count((err, conteo) => {
                res.json({
                    ok: true,
                    periodos,
                    cuantos: conteo
                });

            })
        });
});


app.post('/periodo',[verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let periodo = new Periodo({
        periodo: body.periodo,
        fechaInicio: body.fechaInicio,
        fechaFin: body.fechaFin
    });

    periodo.save((err, periodoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            periodo: periodoDB
        });
    });
});


app.put('/periodo/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Periodo.findById(id, (err, periodoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!periodoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        periodoDB.periodo = body.periodo;
        periodoDB.fechaFin = body.fechaFin;


        periodoDB.save((err, periodoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                periodo: periodoGuardado
            });
        });
    });
});

app.delete('/periodo/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Periodo.findByIdAndRemove(id, (err, periodoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!periodoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Periodo Borrado'
        })
    });
});

module.exports = app;