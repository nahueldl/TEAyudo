require('dotenv').config();
const express = require('express');
const path = require('path');
const requestLogger = require('./middleware/requestLogger');
const { isNullOrUndefined } = require('util');
const bodyParser = require('body-parser');

if(isNullOrUndefined(process.env.NODE_ENV)){
    console.log("Faltan configurar las variables ambientales");
    process.exit(1);
};

const app = express();

//Middleware
app.use(requestLogger);
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


//API Routes
app.use('/api/categorias', require('./routes/categoriasController'));



app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto ${process.env.PORT}`));
