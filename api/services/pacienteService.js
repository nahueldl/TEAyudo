const pacienteDAO = require('../persistence/pacienteDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');


const pacienteService = {

	getAll: async function(usuario){
		//Aca iría la lógia de negocio
		return await pacienteDAO.getAll(usuario.id_usuario);
	},


	getById: async function(id){
		//Aca iría la lógia de negocio
		return await pacienteDAO.getById(parseInt(id));
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

		if(result.state !== estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado el rol elegido'
			}} else if(result != 'familiar'){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene permisos para crear un paciente'
		}}
		
			
		

		//paciente.id_usuario_rol = result.response.id_usuario_rol;

		const pacientes = [];
		pacientes.push(paciente);
		
		return await pacienteDAO.insert(pacientes);
	}
	
};


module.exports = pacienteService;