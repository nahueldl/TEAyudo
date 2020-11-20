const pacienteDAO = require('../persistence/pacienteDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');
const imageUploaderService = require('./imageUploaderService');
const usuarioDAO = require('../persistence/usuarioDAO');


const pacienteService = {

	getAll: async function(usuario){
		//Aca iría la lógia de negocio
		return await pacienteDAO.getAll(usuario.id_usuario);
	},


	getById: async function(id_paciente, usuario){
		//Aca iría la lógia de negocio
		return await pacienteDAO.getById(parseInt(id_paciente), usuario.id_usuario);
	},


	insert: async function(paciente, usuario){
		/*if(paciente.id_rol === undefined || paciente.id_rol === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id_rol no ha sido definido'
			}
			return result;
		}*/

		const result = await rolService.getDescripcionByUsuarioId(usuario.id_usuario);
		const descripcion = result.response;
		const tieneFamiliar = descripcion.some(x => x.descripcion == 'familiar')

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}
		} else if(tieneFamiliar == false){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene permisos para crear un paciente'
			}
			return result;
		}
		if(paciente.base64img !== undefined && paciente.base64img !== null){
			const link = await imageUploaderService.uploadImage(null, paciente.base64img, "png");
			if(link.state === estadosRespuesta.OK)
				paciente.avatar = link.response;
			else if(link === undefined || link == null ){
				return {
					state: estadosRespuesta.USERERROR,
					response: "El formato de la imagen no es válido"
				}
			}else
				return link;
		}else{
			paciente.avatar = null;
		}
		
		const pacientes = [];
		pacientes.push(paciente);
		
		const result1 = await pacienteDAO.insert(pacientes);
		if(result1.state !== estadosRespuesta.OK){
			return result1;
		}
		const assignResult = await pacienteDAO.assingRolToPaciente(usuario.id_usuario, result1.response);
		if(assignResult.state !== estadosRespuesta.OK)
			return assignResult;
		return await this.getById(result1.response, usuario);
	},

	//los requisitos serian el id del paciente, id del profesional y nro de matricula que escribe el usuario
	assignProfesional: async function(requisitos, id_paciente, usuario){
		const result = await rolService.getDescripcionByUsuarioId(usuario.id_usuario);
		const descripcion = result.response;
		const tieneFamiliar = descripcion.some(x => x.descripcion == 'familiar')

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}} else if(tieneFamiliar == false){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene permisos para asignar un Profesional'
		}
		return result;
	}
		return await pacienteDAO.assingProfesional(requisitos, id_paciente, usuario.id_usuario);
	}, 

	delete: async function (id_paciente, usuario){
		const result = await pacienteDAO.delete(parseInt(id_paciente), usuario.id_usuario);
		return result;
	},

	update: async function(id_paciente, usuario, paciente){
		if(paciente.avatar !== undefined && paciente.avatar !== null)
			delete paciente.avatar;
		const result = await this.getById(id_paciente, usuario);
		if(result.state !== estadosRespuesta.OK){
			return result;
		}else if(paciente.base64img !== undefined && paciente.base64img !== null){
			const link = await imageUploaderService.uploadImage(null, paciente.base64img, "png");
			if(link.state === estadosRespuesta.OK)
				paciente.avatar = link.response;
			else if(link === undefined || link == null ){
				return {
					state: estadosRespuesta.USERERROR,
					response: "El formato de la imagen no es válido"
				}
			}else
				return link;
		}else{
			paciente.avatar = result.response.avatar;
		}
		return await pacienteDAO.update(parseInt(id_paciente), usuario.id_usuario, paciente);
	},

	deleteProfesional: async function (id_paciente, usuario){
		const paciente = getById(id_paciente, usuario);
		if(paciente.state !== estadosRespuesta.OK) return paciente;
		const result = await usuarioDAO.deleteProfesionalByPaciente(parseInt(id_paciente));
		return result;
	},

	getProfesional: async function (id_paciente, usuario){
		const paciente = getById(id_paciente, usuario);
		if(paciente.state !== estadosRespuesta.OK) return paciente;
		const result = await usuarioDAO.getProfesionalByPaciente(parseInt(id_paciente));
		return result;
	}
	
};


module.exports = pacienteService;