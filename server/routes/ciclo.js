const express = require('express');
const Ciclo = require('../models/ciclo');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/ciclo', [verificaToken, verificaAdmin_Role], (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    Ciclo.find({}, 'nombrer')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, ciclos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Ciclo.count((err, length) => {
                res.json({
                    ok: true,
                    ciclos,
                    length
                });
            })
        });
});

//  Obtener un ciclo por ID
app.get('/ciclo/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Ciclo.findById(id)
        .exec((err, cicloDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!cicloDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                ciclo: cicloDB
            });

        });

});


app.post('/ciclo', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let ciclo = new Ciclo({
        nombre: body.nombre
    });

    ciclo.save((err, cicloDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            ciclo: cicloDB
        });
    });
});

app.put('/ciclo/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Ciclo.findById(id, (err, cicloDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!cicloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        cicloDB.nombre = body.nombre;

        cicloDB.save((err, cicloGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                ciclo: cicloGuardado
            });
        });
    });
});

app.delete('/ciclo/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Ciclo.findByIdAndRemove(id, (err, cicloDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!cicloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Ciclo Borrada'
        })
    });
});




module.exports = app;
