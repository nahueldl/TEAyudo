const express = require('express');
const router = express.Router();
const pacienteService = require('../services/pacienteService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const rolService = require('../services/rolService');
const { Int } = require('mssql');


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
router.get('/:id',isAuth, async (req, res) => {
	const result = await pacienteService.getById(req.params.id, req.user)

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
		res.status(201).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//Asignar Paciente a profesional
//Agregar el /:id
router.post('/:id/asignarProfesional', isAuth, async (req, res) => {
	const result = await pacienteService.assignProfesional(req.body, req.params.id, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El profesional ha sido asignado al paciente"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//DELETE Paciente (baja logica, no fisica)
router.delete('/:id', isAuth, async (req, res) => {
	const result = await pacienteService.delete(req.params.id, req.user);
	if(result.state === estadosRespuesta.OK)
		res.status(200).json({msg: `Se ha dado de baja el paciente con id=${req.params.id}`});
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: `No se encontro paciente con id=${req.params.id}`});    
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});

//PUT Paciente
router.put('/:id', isAuth, async (req, res) => {
	const result = await pacienteService.update(req.params.id, req.user, req.body);
	if(result.state === estadosRespuesta.OK)
		res.status(200).json({msg: `Se ha actualizado el paciente con id=${req.params.id}`});
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: result.response});  
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


module.exports = router;