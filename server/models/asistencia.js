var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var asistenciaSchema = new Schema({
    correo: { type: String, required: [true, 'Correo es necesario'] },
    creado_por: { type: String, required: [true, 'Es necesario'] },
    asitencia: { type: Schema.Types.ObjectId, unique: true, ref: 'Asistencia', required: true },
    evento: { type: Schema.Types.ObjectId, ref: 'Evento', required: true },
    fecha: { type: Date, required: true, default: Date.now }
});

asistenciaSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Asistencia', asistenciaSchema);