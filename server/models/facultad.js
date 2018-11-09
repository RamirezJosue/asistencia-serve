var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var facultadSchema = new Schema({
    nombre: { type: String, required: [true, 'Facultad es necesario'] },
    nombre_corto: { type: String, required: false },
});

module.exports = mongoose.model('Factultad', facultadSchema);