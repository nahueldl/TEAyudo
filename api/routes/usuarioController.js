const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService')
const rolService = require('../services/rolService')
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');


//Desabilitado por cuestiones de seguridad
//GET Usuario by id
// router.get('/:id', async (req, res) => {
// 	const result = await usuarioService.getById(req.params.id)

// 	if(result.state)
// 		res.status(200).json(result.response);
// 	else
// 		res.status(404).json({msg: `No se encontro usuario con id=${req.params.id}`});    
// });


//POST Usuario
router.post('/register', async (req, res) => {
	const result = await usuarioService.insert(req.body);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El usuario ha sido correctamente creada"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

//POST LogIn
router.post('/login', async (req, res) => {
	const result = await usuarioService.login(req.body.correo, req.body.password);

	if(result.state === estadosRespuesta.OK)
		res.status(200).json({token: result.response});
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(400).json({msg: result.response});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});

//GET Roles
router.get('/roles', isAuth, async (req, res) => {
	const result = await rolService.getRoles(req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});

//POST Rol
router.post('/roles', isAuth, async (req, res) => {
	const result = await rolService.asignarRol(req.user, req.body);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El rol ha sido asignado con exito"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});

//POST ResetPassword
router.post('/resetPassword', async (req, res) => {

	const result = await usuarioService.preparePasswordReset(req.body.correo);

	if(result.state === estadosRespuesta.OK && process.env.NODE_ENV === "development" ){
		res.status(200).json({msg: `Se ha enviado el mail de restablecimiento de contraseña con token=${result.response}`});
	}else if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "Se ha enviado el mail de restablecimiento de contraseña"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});

//POST newPassword
router.post('/resetPassword/:token', async (req, res) => {

	const result = await usuarioService.resetForgottenPassword(req.body.correo, req.params.token, req.body.password);

	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "Se ha reestablecido correctamente la contraseña"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});

module.exports = router;