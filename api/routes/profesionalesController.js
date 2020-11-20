const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService')
const estadosRespuesta = require('../models/estados_respuesta');
const isAuth = require('../middleware/auth').isAuth;


//GET Profesionales
router.get('/', isAuth, async (req, res) => {
	const result = await usuarioService.getProfesionales();
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});


module.exports = router;