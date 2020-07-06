require('dotenv').config();
const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const { isNullOrUndefined } = require('util');

if(isNullOrUndefined(process.env.NODE_ENV)){
    console.log("Faltan configurar las variables ambientales");
    process.exit(1);
}
const PORT = process.env.PORT;

const app = express();

//Middleware
app.use(requestLogger);


//API Routes
app.use('/api/categorias', require('./routes/categoriasController'));



app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

