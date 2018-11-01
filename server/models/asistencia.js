var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var asistenciaSchema = new Schema({

    codigo: { type: String, required: [true, 'El codigo es necesario'] },
    nombres: { type: String, required: [true, 'los nombres son requeridos'] },
    fechahora: { type: String, required: [true, 'La fecha y hora son obligatorios'] },
    ofline: { type: String, required: [true, 'El Ofline es Obligatorio'] },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El id usuario es un campo obligatorio ']
    },
    idAlumnoMatricula: {
        type: Schema.Types.ObjectId,
        ref: 'Alumnomatricula',
        required: [true, 'El id alumno matricula es un campo obligatorio ']
    },
    idEventoprogramado: {
        type: Schema.Types.ObjectId,
        ref: 'Eventoprogramado',
        required: [true, 'El id Evento programado es un campo obligatorio ']

    }
});

asistenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Asistencia', asistenciaSchema);