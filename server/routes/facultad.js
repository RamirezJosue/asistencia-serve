const express = require('express');
const facultad = require('../models/facultad');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/facultad', [verificaToken, verificaAdmin_Role], (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    facultad.find({}, 'nombre nombre_corto')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, facultads) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            facultad.count((err, length) => {
                res.json({
                    ok: true,
                    facultads,
                    length
                });
            })
        });
});

//  Obtener un facultad por ID
app.get('/facultad/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    facultad.findById(id)
        .exec((err, facultadDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!facultadDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                facultad: facultadDB
            });

        });

});


app.post('/facultad', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let facultad = new facultad({
        nombres: body.nombre,
        nombre_corto: body.nombre_corto
    });

    facultad.save((err, facultadDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            facultad: facultadDB
        });
    });
});

app.put('/facultad/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    facultad.findById(id, (err, facultadDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!facultadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        facultadDB.nombre = body.nombre;
        facultadDB.nombre_corto = body.nombre_corto;

        facultadDB.save((err, facultadGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                facultad: facultadGuardado
            });
        });
    });
});

app.delete('/facultad/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    facultad.findByIdAndRemove(id, (err, facultadDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!facultadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'facultad Borrada'
        })
    });
});




module.exports = app;
