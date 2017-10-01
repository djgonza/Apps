require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/productos', require('./controllers/productos.controller'));

// start server
var port = process.env.PORT === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
	console.log('Servidor escuchando en el puerto: ' + port);
});
