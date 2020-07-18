const express = require('express');
const router = express.Router();
const pacienteService = require('../services/pacienteService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const rolService = require('../services/rolService');


//GET Pacientes
router.get('/', isAuth, async (req, res) => {
	const result = await pacienteService.getAll(req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});


//GET Paciente by id
router.get('/:id', async (req, res) => {
	const result = await pacienteService.getById(req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json(result.response);
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: `No se encontro paciente con id=${req.params.id}`});    
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


//POST Paciente
router.post('/', isAuth, async (req, res) => {
	const result = await pacienteService.insert(req.body, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El paciente ha sido correctamente creado"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});


module.exports = router;