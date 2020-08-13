const express = require('express');
const router = express.Router();
const pictogramaService = require('../services/pictogramaService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');


//GET Pictogramas by nombre or etiqueta
router.get('/', isAuth, async (req, res) => {
	let result;
	if(!isNullOrUndefined(req.query.nombre))
		result = await pictogramaService.getByNombre(req.query.nombre, req.query.paciente);
	else if(!isNullOrUndefined(req.query.etiqueta))
		result = await pictogramaService.getByEtiqueta(req.query.etiqueta);
	else{
		res.status(404).json();
		return;
	}
	
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//GET Pictograma by Id
router.get('/:id', isAuth, async (req, res) => {
	const result = await pictogramaService.getById(req.params.id, req.query.paciente, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//PUT Pictograma
router.put('/:id', isAuth, async (req, res) => {
	const result = await pictogramaService.customizePictograma(req.user, req.params.id, req.body);
	
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El pictograma ha sido modificado con exito"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//POST Pictograma
router.post('/', isAuth, async (req, res) => {
	const result = await pictogramaService.addPictograma(req.user, req.body);
	
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

module.exports = router;