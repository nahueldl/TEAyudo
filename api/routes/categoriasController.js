const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoriaService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const pictogramaService = require('../services/pictogramaService')


//GET Categorias
router.get('/', isAuth, async (req, res) => {
	const result = await categoriaService.getAll(req.user, req.query.paciente);
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


//DELETE Categoria
router.delete('/:id', isAuth, async (req, res) => {
	const result = await categoriaService.delete(req.user, req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json({msg: "La categoría fue eliminada correctamente"});
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(400).json({msg: result.response});    
	else if(result.state === estadosRespuesta.FORBIDDEN)
		res.status(403).json({msg: "La categoría no le pertenece al usuario"});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


//PUT Categoria
router.put('/:id', isAuth, async (req, res) => {
	const result = await categoriaService.update(req.user, req.params.id, req.body)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json({msg: "La categoría fue actualizada correctamente"});
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(400).json({msg: result.response});    
	else if(result.state === estadosRespuesta.FORBIDDEN)
		res.status(400).json({msg: "La categoría no le pertenece al usuario"});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


//POST Categoria
router.post('/', isAuth, async (req, res) => {
	const result = await categoriaService.insert(req.body, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});


//GET Pictogramas by idCategoria
router.get('/:id/pictogramas', isAuth, async (req, res) => {
	let result;
	result = await pictogramaService.getByCategoriaAndPaciente(req.user, req.query.paciente, req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json(result.response);
	else if(result.state === estadosRespuesta.USERERROR || (Array.isArray(result.response) && result.response.length < 1))
		res.status(404).json({msg: `No se encontro categoría con id=${req.params.id} o no tiene pictogramas asociados`});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});


module.exports = router;