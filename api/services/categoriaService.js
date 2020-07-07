const categoriaDAO = require('../persistence/categoriaDAO');

categoriaService = {
	getAll: async function(){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll();
	},
	get: async function(id){
		//Aca iría la lógia de negocio
		return await categoriaDAO.get(parseInt(id));
	}
};

module.exports = categoriaService;