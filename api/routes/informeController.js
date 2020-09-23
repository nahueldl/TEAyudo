const http = require('http');
const express = require('express');
const router = express.Router();
const informeService = require('../services/informeService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const { fstat } = require('fs');

//GET Informe by id
router.get('/:id', async (req, res) => {
	const result = await informeService.getById(req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json(result.response);
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: `No se encontro el informe con id=${req.params.id}`});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


//POST Informe
router.post('/', isAuth, async (req, res) => {
	const result = await informeService.insert(req.body, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El informe ha sido correctamente creado"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

module.exports = router;