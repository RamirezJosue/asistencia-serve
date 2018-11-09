var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var escuelaSchema = new Schema({
    nombre: { type: String, required: [true, 'Escuela es necesario'] },
    nombre_corto: { type: String, required: false },
    facultad: { type: Schema.Types.ObjectId, ref: 'Facultad', required: true },
});

module.exports = mongoose.model('Escuela', escuelaSchema);