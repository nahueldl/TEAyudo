const categoriaDAO = require('../persistence/categoriaDAO');

categoriaService = {
	getAll: async function(){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll();
	}
};

module.exports = categoriaService;