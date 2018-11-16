const express = require('express');
const Matricula = require('../models/matricula');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/matricula', [verificaToken, verificaAdmin_Role], (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    Matricula.find({}, 'persona escuela ciclo fecha')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, matriculas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Matricula.count((err, length) => {
                res.json({
                    ok: true,
                    matriculas,
                    length
                });
            })
        });
});

//  Obtener un matricula por ID
app.get('/matricula/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Matricula.findById(id)
        .exec((err, matriculaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!matriculaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                matricula: matriculaDB
            });

        });

});


app.post('/matricula', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let matricula = new Matricula({
        persona: body.persona,
        escuela: body.escuela,
        ciclo: body.ciclo,
        fecha: body.fecha
    });

    matricula.save((err, matriculaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            matricula: matriculaDB
        });
    });
});

app.put('/matricula/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Matricula.findById(id, (err, matriculaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!matriculaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        matriculaDB.persona = body.persona;
        matriculaDB.escuela = body.escuela;
        matriculaDB.ciclo = body.ciclo;
        matriculaDB.fecha = body.fecha;

        matriculaDB.save((err, matriculaGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                matricula: matriculaGuardado
            });
        });
    });
});

app.delete('/matricula/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Matricula.findByIdAndRemove(id, (err, matriculaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!matriculaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Matricula Borrada'
        })
    });
});




module.exports = app;
