var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var periodoSchema = new Schema({
    periodo: { type: String, required: [true, 'Periodo es necesario'] },
    fechaInicio: { type: Date, required: true, default: Date.now },
    fechaFin: { type: Date, required: false }
});

periodoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Periodo', periodoSchema);