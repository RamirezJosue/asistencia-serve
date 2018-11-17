const express = require('express');
const app = express();



app.use(require('./usuario'));
app.use(require('./asistencia'));
// app.use(require('./upload'));
app.use(require('./login'));
app.use(require('./persona'));
// app.use(require('./periodo'));
app.use(require('./imagenes'));
app.use(require('./ciclo'));
app.use(require('./facultad'));
app.use(require('./escuela'));
app.use(require('./matricula'));
// app.use(require('./asistencia'));
// app.use(require('./eventoprogramado'));

module.exports = app;