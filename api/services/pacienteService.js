const pacienteDAO = require('../persistence/pacienteDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');


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
		/*if(isNullOrUndefined(paciente.id_rol)){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id_rol no ha sido definido'
			}
			return result;
		}*/

		const result = await rolService.getDescripcionByUsuarioId(usuario.id_usuario);
		const descripcion = result.response;

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}} else if(descripcion.some(x => x.descripcion == 'familiar')){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene permisos para crear un paciente'
		}
		return result;
	}
		
		const pacientes = [];
		pacientes.push(paciente);
		
		const result1 = await pacienteDAO.insert(pacientes);
		if(result1.state !== estadosRespuesta.OK){
			return result1;
		}
		return await pacienteDAO.assingRolToPaciente(usuario.id_usuario, result1.response);
	},

	delete: async function (id_paciente, usuario){
		const result = await pacienteDAO.delete(parseInt(id_paciente), usuario.id_usuario);
		return result;
	},

	update: async function(id_paciente, usuario, paciente){
		return await pacienteDAO.update(parseInt(id_paciente), usuario.id_usuario, paciente);
	}
	
};


module.exports = pacienteService;