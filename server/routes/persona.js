const express = require('express');
const Persona = require('../models/persona');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();


app.get('/persona', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Persona.find({}, 'nombres apellidos dnicodigo email numerocelular')
        .skip(desde)
        .limit(limite)
        .exec((err, personas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Persona.count((err, conteo) => {
                res.json({
                    ok: true,
                    personas,
                    cuantos: conteo
                });

            })
        });
});

//  Obtener un persona por ID
app.get('/persona/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    Persona.findById(id)
        .exec((err, personaDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!personaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                persona: personaDB
            });

        });

});


app.post('/persona', [verificaToken, verificaAdmin_Role], (req, res) => {
    let body = req.body;
    let persona = new Persona({
        nombres: body.nombres,
        apellidos: body.apellidos,
        dnicodigo: body.dnicodigo,
        email: body.email,
        numerocelular: body.numerocelular
    });

    persona.save((err, personaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            persona: personaDB
        });
    });
});

app.put('/persona/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = req.body;

    Persona.findById(id, (err, personaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        personaDB.nombres = body.nombres;
        personaDB.apellidos = body.apellidos;
        personaDB.dnicodigo = body.dnicodigo;
        personaDB.email = body.email;
        personaDB.numerocelular = body.numerocelular;

        personaDB.save((err, personaGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                persona: personaGuardado
            });
        });
    });
});

app.delete('/persona/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Persona.findByIdAndRemove(id, (err, personaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Persona Borrada'
        })
    });
});




module.exports = app;