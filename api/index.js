require('dotenv').config();

const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const { isNullOrUndefined } = require('util');
const bodyParser = require('body-parser');


//Chequea que se hayan levantado las variables de entorno sean de produccion o de desarrollo
if(isNullOrUndefined(process.env.NODE_ENV)){
	console.log("Faltan configurar las variables ambientales");
	process.exit(1);
};

//Levanta express
const app = express();


//Middleware
app.use(requestLogger);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//API Routes
app.use('/api/categorias', require('./routes/categoriasController'));


//Levanta el puerto en que va a escuchar
app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`));
