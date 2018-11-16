const express = require('express');
const Escuela = require('../models/escuela');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/escuela', [verificaToken, verificaAdmin_Role], (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    Escuela.find({}, 'nombre nombre_corto facultad')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, escuelas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Escuela.count((err, length) => {
                res.json({
                    ok: true,
                    escuelas,
                    length
                });
            })
        });
});

//  Obtener un escuela por ID
app.get('/escuela/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Escuela.findById(id)
        .exec((err, escuelaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!escuelaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                escuela: escuelaDB
            });

        });

});


app.post('/escuela', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let escuela = new Escuela({
        nombres: body.nombre,
        nombre_corto: body.nombre_corto,
        facultad: body.facultad
    });

    escuela.save((err, escuelaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            escuela: escuelaDB
        });
    });
});

app.put('/escuela/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Escuela.findById(id, (err, escuelaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!escuelaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        escuelaDB.nombre = body.nombre;
        escuelaDB.nombre_corto = body.nombre_corto;
        escuelaDB.facultad = body.facultad;

        escuelaDB.save((err, escuelaGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                escuela: escuelaGuardado
            });
        });
    });
});

app.delete('/escuela/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Escuela.findByIdAndRemove(id, (err, escuelaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!escuelaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Escuela Borrada'
        })
    });
});




module.exports = app;
