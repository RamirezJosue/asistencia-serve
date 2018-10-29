const express = require('express');
const Periodo = require('../models/periodo');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion') 

const app = express();

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


module.exports = app;