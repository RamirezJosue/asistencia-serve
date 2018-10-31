var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var periodoSchema = new Schema({
    periodo: { type: String, required: [true, 'Periodo es necesario'] },
    fechaInicio: { type: Date, required: true, default: Date.now },
    fechaFin: { type: Date, required: false }
});

module.exports = mongoose.model('Periodo', periodoSchema);