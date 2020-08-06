const express = require('express');
const router = express.Router();
const matriculaService = require('../services/matriculaService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');

//GET Matricula
router.get('/', isAuth, async (req, res) => {
	const result = await matriculaService.checkMatricula(req.body);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});

module.exports = router;