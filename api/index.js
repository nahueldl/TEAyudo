const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/loggers/requestLogger');
const { builtinModules } = require('module');

//Config (TODO:sacarlo de aca)
const PORT = process.env.PORT || 8080;

const app = express();

//Middleware
app.use(requestLogger);


//API Routes
app.use('/api/categorias', require('./routes/categorias/categoriasController'));



app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

