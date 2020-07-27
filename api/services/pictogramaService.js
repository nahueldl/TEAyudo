const pictogramaDAO = require('../persistence/pictogramaDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');

const pictogramaService = {
	getByCategoriaAndPaciente: async function (usuario, idPaciente, idCategoria) {
		//TODO Check que el paciente para el que se esta pidiendo pertenezca al usuario
		if(isNullOrUndefined(idPaciente))
			return await pictogramaDAO.getByCategoria(parseInt(idCategoria));
		else
			return await pictogramaDAO.getByCategoriaAndPaciente(parseInt(idCategoria), parseInt(idPaciente))
	},
	getByEtiqueta: async function (etiqueta) {
		if(isNullOrUndefined(etiqueta) || etiqueta.length < 3){
			return {
				state: estadosRespuesta.USERERROR,
				response: 'No se puede realizar una busqueda para menos de 3 caracteres'
			};
		}
		return await pictogramaDAO.findByTag(etiqueta);
	},
	getByNombre: async function (nombre){
		if(isNullOrUndefined(nombre) || nombre.length < 3){
			return {
				state: estadosRespuesta.USERERROR,
				response: 'No se puede realizar una busqueda para menos de 3 caracteres'
			};
		}
		return await pictogramaDAO.findByNombre(nombre);
	}
}


module.exports = pictogramaService;