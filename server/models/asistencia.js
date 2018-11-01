var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var asistenciaSchema = new Schema({
    codigo: { type: String, required: [true, 'El codigo es necesario'] },
    nombres: { type: String, required: [true, 'los nombres son requeridos'] },
    fechahora: { type: String, required: [true, 'La fecha y hora son obligatorios'] },
    ofline: { type: String, required: [true, 'El Ofline es Obligatorio'] },
    idUsuario: { type: String, unique: true, required: [true, 'El Id de usuario es obligatorio'] },
    idAlumnoMatricula: { type: String, required: [true, 'El Id del AlumnoMatricula es obligatorio'] },
    idEventoprogramado: { type: String, required: [true, 'El id Evento Programado es Obligatorio '] }
});

asistenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Asistencia', asistenciaSchema);
