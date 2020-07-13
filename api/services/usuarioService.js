const usuarioDAO = require('../persistence/usuarioDAO');
const rolDAO = require('../persistence/rolDAO');

const usuarioService = {

	getById: async function(id){
		//Aca iría la lógia de negocio
		return await usuarioDAO.getById(parseInt(id));
	},

	
	getByUUID: async function(uuid){
		//Aca iría la lógia de negocio
		return await usuarioDAO.getByUUID(uuid);
	},


	insert: async function(usuario){
		//Aca iría la lógia de negocio

		//TODO: chequear que se carguen los datos del profesional, o del familiar, o de ambos
		//pero que no falte data

		//Todo validar que el correo cumpla el formato

		return await usuarioDAO.insert(usuario);
	},


	login: async function(correo, password){
		//Aca iría la lógia de negocio
		return await usuarioDAO.login(correo, password);
	},


	getRoles: async function(usuario){
		return await rolDAO.getByUsuarioId(usuario.id_usuario);
	},


	asignarRol: async function(usuario, rol){
		return await rolDAO.insertUsuarioRol(usuario.id_usuario, rol.id_rol);
	}
	
};


module.exports = usuarioService;