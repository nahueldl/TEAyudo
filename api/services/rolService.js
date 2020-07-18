const rolDAO = require('../persistence/rolDAO');


const rolService = {

	getUsuarioRol: async function(idUsuario, idRol){
		//Aca iría la lógia de negocio
		return await rolDAO.getUsuarioRol(idUsuario, idRol);
	},

	getDescripcionByUsuarioId: async function (idUsuario){
		return await rolDAO.getDescripcionByUsuarioId(idUsuario);
	}
	
};


module.exports = rolService;