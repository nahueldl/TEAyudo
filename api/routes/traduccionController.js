const express = require('express');
const router = express.Router();
const traduccionService = require('../services/traduccionService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const { Int } = require('mssql');

//POST Traduccion
router.post('/', isAuth, async (req, res) => {
    //Los parametros que toma el service no son esos, fijarse bien que onda
	const result = await traduccionService.insert(req.body.pictogramas, req.query.paciente);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "La traduccion ha sido correctamente creada"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

module.exports = router;