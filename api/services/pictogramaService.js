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
	}
}


module.exports = pictogramaService;