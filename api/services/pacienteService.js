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
		const descripcion = result.response[0].descripcion;

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}} else if(descripcion != 'familiar'){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene permisos para crear un paciente'
		}
		return result;
	}
		
			
		

		//paciente.id_usuario_rol = result.response.id_usuario_rol;

		const pacientes = [];
		pacientes.push(paciente);
		
		const result1 = await pacienteDAO.insert(pacientes);
		if(result1.state !== estadosRespuesta.OK){
			return result1;
		}
		return await pacienteDAO.assingRolToPaciente(usuario.id_usuario, result1.response);
	},

	delete: async function (id_paciente){
		const result = await pacienteDAO.delete(parseInt(id_paciente));
		return result;
	}
	
};


module.exports = pacienteService;