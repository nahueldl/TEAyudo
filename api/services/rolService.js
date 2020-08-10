const rolDAO = require('../persistence/rolDAO');
const matriculaService = require('./matriculaService');
const estadosRespuesta = require('../models/estados_respuesta');


const rolService = {

	getUsuarioRol: async function(idUsuario, idRol){
		//Aca iría la lógia de negocio
		return await rolDAO.getUsuarioRol(idUsuario, idRol);
	},


	getDescripcionByUsuarioId: async function (idUsuario){
		return await rolDAO.getDescripcionByUsuarioId(idUsuario);
	},

	getRoles: async function(usuario){
		return await rolDAO.getByUsuarioId(usuario.id_usuario);
	},


	asignarRol: async function(usuario, rol){
		//chequear si el rol es un profesional
		const result = await rolDAO.getDescripcionById(rol.id_rol);
		const descripcion = result.response;
		const esProfesional = descripcion.descripcion.toUpperCase();

		if(esProfesional == 'PROFESIONAL'){
			const usuarioData = {
				nombre: usuario.nombre,
				apellido: usuario.apellido,
				matricula: usuario.nro_matricula,
				dni: usuario.nro_doc
			}

			const resultado1 = await matriculaService.checkMatricula(usuarioData);
			if(resultado1.state != estadosRespuesta.OK){
				return resultado1;
			}
		}
		
		return await rolDAO.insertUsuarioRol(usuario.id_usuario, rol.id_rol);

	}
	
};


module.exports = rolService;