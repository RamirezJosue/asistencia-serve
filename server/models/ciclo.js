var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var cicloSchema = new Schema({
    nombre: { type: String, required: [true, 'Ciclo es necesario'] },
});

module.exports = mongoose.model('Ciclo', cicloSchema);