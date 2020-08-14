const categoriaDAO = require('../persistence/categoriaDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');


const categoriaService = {

	getAll: async function(usuario, idPaciente){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll(usuario.id_usuario, idPaciente);
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
	},


	delete: async function(usuario, idCategoria){
		const posee = await categoriaDAO.poseeCategoria(usuario.id_usuario, idCategoria);
		if(posee.state !== estadosRespuesta.OK){
			return {
				state: estadosRespuesta.FORBIDDEN,
				response: "No puede acceder a este recurso"
			}
		}
		//TODO: Eliminar todos los pictogramas asociados
		return await categoriaDAO.delete(idCategoria);
	},


	update: async function(usuario, idCategoria, data){
		const posee = await categoriaDAO.poseeCategoria(usuario.id_usuario, idCategoria);

		if(posee.state !== estadosRespuesta.OK){
			return {
				state: estadosRespuesta.FORBIDDEN,
				response: "No puede acceder a este recurso"
			}
		}

		return await categoriaDAO.update(idCategoria, data.nombre);
	},

	poseeCategoria: async function(idUsuario, idCategoria){
		return await categoriaDAO.poseeCategoria(idUsuario, idCategoria);
	}
	
};


module.exports = categoriaService;