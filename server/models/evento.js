var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var periodoSchema = new Schema({
    nombres: { type: String, required: [true, 'Evento es necesario'] },
    lugar: { type: String, required: [true, 'Lugar es necesario'] },
    lat: { type: String, required: [true, 'Latitud es necesario'] },
    long: { type: String, required: [true, 'Longitud es necesario'] },
    periodo: { type: String, required: [true, 'Periodo es necesario'] },
    fecha: { type: Date, required: false },
    fechaInicio: { type: Date, required: false },
    fechaFin: { type: Date, required: false }
});

module.exports = mongoose.model('Periodo', periodoSchema);