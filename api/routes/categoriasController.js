const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoriaService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');


//GET Categorias
router.get('/', isAuth, async (req, res) => {
	const result = await categoriaService.getAll(req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});


//GET Categoria by id
router.get('/:id', async (req, res) => {
	const result = await categoriaService.getById(req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json(result.response);
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: `No se encontro categoría con id=${req.params.id}`});    
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


//POST Categoria
router.post('/', isAuth, async (req, res) => {
	const result = await categoriaService.insert(req.body, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "La categoria ha sido correctamente creada"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});


module.exports = router;