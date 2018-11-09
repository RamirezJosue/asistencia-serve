const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    usuario: { type: String, unique: true, required: [true, 'El usuario es necesario'] },
    correo: { type: String, unique: true, required: [true, 'Correo es necesario'] },
    clave: { type: String, required: [true, 'El clave es necesario'] },
    img: { type: String, required: false },
    role: { type: String, default: 'USER_ROLE', enum: rolesValidos },
    persona: { type: Schema.Types.ObjectId, ref: 'Persona', required: true },
    estado: { type: Boolean, default: true },
    creado: { type: Date, required: true, default: Date.now }
});

usuarioSchema.methods.toJSON = function() {
    let username = this;
    let userObject = username.toObject();
    delete userObject.clave;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })
module.exports = mongoose.model('Usuario', usuarioSchema);