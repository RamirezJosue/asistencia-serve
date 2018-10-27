const jwt = require('jsonwebtoken');

// ========================
// Verificar Token
// ========================

let verificaToken = (req, res, next) => {
    let Authorization = req.get('Authorization');

    jwt.verify(Authorization, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Authorization invalido"
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};

// ========================
// Verifica AdminRole
// ========================

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es un administrador'
            }
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}