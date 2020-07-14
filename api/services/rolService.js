const rolDAO = require('../persistence/rolDAO');


const rolService = {

	getUsuarioRol: async function(idUsuario, idRol){
		//Aca iría la lógia de negocio
		return await rolDAO.getUsuarioRol(idUsuario, idRol);
	}
	
};


module.exports = rolService;