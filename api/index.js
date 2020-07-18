require('dotenv').config();

const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const BearerStrategy = require('./middleware/auth').BearerStrategy;
const { isNullOrUndefined } = require('util');
const passport = require('passport');


//Chequea que se hayan levantado las variables de entorno sean de produccion o de desarrollo
if(isNullOrUndefined(process.env.NODE_ENV)){
	console.log("Faltan configurar las variables ambientales");
	process.exit(1);
};

//Levanta express
const app = express();

//Set passport strategy
passport.use(BearerStrategy);

//Middleware
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


//API Routes
app.use('/api/categorias', require('./routes/categoriasController'));
app.use('/api/usuario', require('./routes/usuarioController'));
app.use('/api/pacientes', require('./routes/pacienteController'));

//Levanta el puerto en que va a escuchar
app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`));
