var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var personaSchema = new Schema({
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    dni: { type: String, unique: true, required: [true, 'El Dni es necesario'] },
    codigo: { type: String, unique: true, required: false },
    celular: { type: String, required: [true, 'Numero de celular es necesario'] }
});

personaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Persona', personaSchema);