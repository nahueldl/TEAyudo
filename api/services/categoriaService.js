const categoriaDAO = require('../persistence/categoriaDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');


const categoriaService = {

	getAll: async function(usuario){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll(usuario.id_usuario);
	},


	getById: async function(id){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getById(parseInt(id));
	},


	insert: async function(categoria, usuario){
		if(isNullOrUndefined(categoria.id_rol)){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id_rol no ha sido definido'
			}
			return result;
		}

		const result = await rolService.getUsuarioRol(usuario.id_usuario, categoria.id_rol);

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}
			return result;
		}

		categoria.id_usuario_rol = result.response.id_usuario_rol;

		const categorias = [];
		categorias.push(categoria);
		
		return await categoriaDAO.insert(categorias);
	}
	
};


module.exports = categoriaService;