const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService')
const isAuth = require('../middleware/auth').isAuth;


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
	if(result.state){
		res.status(200).json({msg: "El usuario ha sido correctamente creada"});
	}else{
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});

//POST LogIn
router.post('/login', async (req, res) => {
	const result = await usuarioService.login(req.body.correo, req.body.password);

	if(result.state)
		res.status(200).json({token: result.response});
	else
		res.status(400).json({msg: result.response});
});

router.get('/roles', isAuth, async (req, res) => {
	const result = await usuarioService.getRoles(req.user);
	if(result.state){
		res.status(200).json(result.response);
	}else{
		res.status(400).json({msg: "Este usuario no posee roles"});
	}
});

router.post('/roles', isAuth, async (req, res) => {
	const result = await usuarioService.asignarRol(req.user, req.body);
	if(result.state){
		res.status(200).json(result.response);
	}else{
		res.status(400).json({msg: "Este usuario no posee roles"});
	}
});

module.exports = router;