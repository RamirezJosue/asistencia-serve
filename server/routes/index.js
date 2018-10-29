const express = require('express');
const app = express();



app.use(require('./usuario'));
app.use(require('./upload'));
app.use(require('./login'));
app.use(require('./persona'));
app.use(require('./periodo'));
app.use(require('./imagenes'));

module.exports = app;