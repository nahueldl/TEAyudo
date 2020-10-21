const http = require('http');
const express = require('express');
const router = express.Router();
const informeService = require('../services/informeService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');


router.get('/', async (req, res) => {
	const result = await informeService.getPDF(req.user, req.query.paciente, res);
});

module.exports = router;