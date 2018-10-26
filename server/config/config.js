// ========================
// Puerto
// ========================

process.env.PORT = process.env.PORT || 3000;

// ========================
// Entorno
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ========================
// Base de datos
// ========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/asistencia';
} else {
    urlDB = 'mongodb://asistencia-user:d3velopers@ds231643.mlab.com:31643/asistencia';
}

process.env.URLDB = urlDB;