const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoriaService');
const isAuth = require('../middleware/auth').isAuth;


//GET Categorias
router.get('/', isAuth, async (req, res) => {
	const result = await categoriaService.getAll(req.user);
	if(result.state){
		res.status(200).json(result.response);
	}else{
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});


//GET Categoria by id
router.get('/:id', async (req, res) => {
	const result = await categoriaService.getById(req.params.id)

	if(result.state)
		res.status(200).json(result.response);
	else
		res.status(404).json({msg: `No se encontro categoría con id=${req.params.id}`});    
});


//POST Categoria
router.post('/', isAuth, async (req, res) => {
	const result = await categoriaService.insert(req.body, req.user);
	if(result.state){
		res.status(200).json({msg: "La categoria ha sido correctamente creada"});
	}else{
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});


module.exports = router;