var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var asistenciaSchema = new Schema({
    nombres: { type: String, required: true },
    creado_por: { type: String, required: false },
    asistencia: { type: Schema.Types.ObjectId, unique: true, ref: 'Persona', required: [true, 'Las asistencia es obligatorio'] },
    evento: { type: Schema.Types.ObjectId, ref: 'Evento', required: false },
    fecha: { type: Date, required: true, default: Date.now }
});

asistenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Asistencia', asistenciaSchema);