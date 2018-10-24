const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    user: { type: String, unique: true, required: [true, 'El usuario es necesario'] },
    clave: { type: String, required: [true, 'El clave es necesario'] },
    role: { type: String, default: 'USER_ROLE', enum: rolesValidos },
    estado: { type: Boolean, default: true }
});

usuarioSchema.methods.toJSON = function() {
    let username = this;
    let userObject = username.toObject();
    delete userObject.clave;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })
module.exports = mongoose.model('Usuario', usuarioSchema);