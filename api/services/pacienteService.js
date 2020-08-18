const pacienteDAO = require('../persistence/pacienteDAO');
const rolService = require('./rolService')
const estadosRespuesta = require('../models/estados_respuesta');


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
			}} else if(tieneFamiliar == false){
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
		return await pacienteDAO.update(parseInt(id_paciente), usuario.id_usuario, paciente);
	}
	
};


module.exports = pacienteService;