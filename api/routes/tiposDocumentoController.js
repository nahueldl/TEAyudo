const router = require('express').Router();
const tipoDocumentoService = require('../services/tipoDocumentoService')
const estadosRespuesta = require('../models/estados_respuesta');


//GET TipoDocumento
router.get('/', async (req, res) => {

	const result = await tipoDocumentoService.getAll();

	if(result.state === estadosRespuesta.OK){
		res.status(200).json(result.response);
	}else{
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}
});


module.exports = router;