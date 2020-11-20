require('dotenv').config();

const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const BearerStrategy = require('./middleware/auth').BearerStrategy;
const passport = require('passport');
const corsPolicy = require('./middleware/setCorsPolicy')

//Chequea que se hayan levantado las variables de entorno sean de produccion o de desarrollo
if(process.env.NODE_ENV === undefined || process.env.NODE_ENV === null){
	console.log("Faltan configurar las variables ambientales");
	process.exit(1);
};


//Levanta express
const app = express();

//Set passport strategy
passport.use(BearerStrategy);

//Middleware
app.use(requestLogger);
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(corsPolicy);


//API Routes
app.use('/api/categorias', require('./routes/categoriasController'));
app.use('/api/usuario', require('./routes/usuarioController'));
app.use('/api/pacientes', require('./routes/pacienteController'));
app.use('/api/pictogramas', require('./routes/pictogramasController'));
app.use('/api/traducciones', require('./routes/traduccionController'));
app.use('/api/tipoDocumento', require('./routes/tiposDocumentoController'));
app.use('/api/informes', require('./routes/informeController'));
app.use('/api/roles', require('./routes/rolesController'));
app.use('/api/profesionales', require('./routes/profesionalesController'));



//Levanta el puerto en que va a escuchar
app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`));
