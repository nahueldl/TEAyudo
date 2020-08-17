const tipoDocumentoDAO = require('../persistence/tipoDocumentoDAO');


const tipoDocumentoService = {

	getAll: async function(){
		return await tipoDocumentoDAO.getAll();
	}
}


module.exports = tipoDocumentoService;
