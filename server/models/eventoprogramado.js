var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var eventoprogramadoSchema = new Schema({

    fecha: { type: String, required: [true, 'La fecha es obligatorio'] },
    horainicio: { type: String, required: [true, 'La hora de inicio es obligatorio'] },
    horafin: { type: String, required: [true, 'La hora de fin es obligatorio'] },
    categoria: { type: Schema.Types.ObjectId, ref: 'Evento', required: true },
});

eventoprogramadoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Eventoprogramado', eventoprogramadoSchema);
