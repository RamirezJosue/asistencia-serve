var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var matriculaSchema = new Schema({
    persona: { type: Schema.Types.ObjectId, unique: true, ref: 'Persona', required: true },
    escuela: { type: Schema.Types.ObjectId, unique: true, ref: 'Escuela', required: true },
    ciclo: { type: Schema.Types.ObjectId, unique: true, ref: 'Ciclo', required: true },
    fecha: { type: Date, required: true, default: Date.now }
});

matriculaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Matricula', matriculaSchema);