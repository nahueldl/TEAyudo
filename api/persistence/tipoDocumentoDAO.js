const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');


const tipoDocumentoDAO = {
	getAll: async function (){
		return await genericDAO.runQuery("select id_tipo_documento, nombre, descripcion from TipoDocumento where activo = 1");
	}
}


module.exports = tipoDocumentoDAO;