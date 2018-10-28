var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var personaSchema = new Schema({
    nombres: { type: String, required: [true, 'El nombre es necesario'] },
    apellidos: { type: String, required: [true, 'El apellido es necesario'] },
    dnicodigo: { type: String, unique: true, required: [true, 'El Dni o Codigo es necesario'] },
    email: { type: String, required: [true, 'Email es necesario'] },
    numerocelular: { type: String, required: [true, 'Numero de celular es necesario'] }
});

personaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Persona', personaSchema);