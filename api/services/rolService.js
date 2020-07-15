const rolDAO = require('../persistence/rolDAO');


const rolService = {

	getUsuarioRol: async function(idUsuario, idRol){
		//Aca iría la lógia de negocio
		return await rolDAO.getUsuarioRol(idUsuario, idRol);
	},


	getRoles: async function(usuario){
		return await rolDAO.getByUsuarioId(usuario.id_usuario);
	},


	asignarRol: async function(usuario, rol){
		return await rolDAO.insertUsuarioRol(usuario.id_usuario, rol.id_rol);
	}
	
};


module.exports = rolService;