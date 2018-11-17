const express = require('express');
var qr = require('qr-image');
const Persona = require('../models/persona');
const fileUpload = require('express-fileupload');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')
const app = express();

app.use(fileUpload());

app.get('/persona', (req, res) => {
    let pageIndex = req.query.pageIndex || 0;
    let pageSize = req.query.pageSize || 0;
    Persona.find({}, 'nombres apellidos dni codigo celular')
        .skip(Number(pageIndex))
        .limit(Number(pageSize))
        .exec((err, personas) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Persona.count((err, length) => {
                res.json({
                    ok: true,
                    personas,
                    length
                });
            })
        });
});

//  Obtener un persona por ID
app.get('/persona/:id', (req, res) => {

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


app.post('/persona', (req, res) => {
    let body = req.body;
    let persona = new Persona({
        nombres: body.nombres,
        apellidos: body.apellidos,
        codigo: body.codigo,
        dni: body.dni,
        email: body.email,
        celular: body.celular
    });

    var qr_img = qr.image(body.codigo, { type: 'png' });
    var img_name = body.codigo + ".png";

    qr_img.pipe(require('fs').createWriteStream(img_name));
    persona.qr_imagen = img_name;
    console.log(persona.qr_imagen);

    // archivo.mv('uploads/' + img_name, (err) => {
    //     if (err) {
    //         return res.status(500).json({
    //             ok: false,
    //             message: 'Imagen no subida'
    //         })
    //     }
    // });

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
        personaDB.codigo = body.codigo;
        personaDB.dni = body.dni;
        personaDB.celular = body.celular;

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