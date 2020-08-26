const jugadaDAO = require('../persistence/jugadaDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const pictogramaService = require('./pictogramaService');


const jugadaService = {

	iniciarJugada: async function (idPaciente) {
		//TODO: chequear que el paciente le pertenezca al usuario logueado
		const resultPictograma = await pictogramaService.getPictogramaForGame();

		if(resultPictograma.state !== estadosRespuesta.OK)
			return resultPictograma;

		const result = await jugadaDAO.create(idPaciente, 1);

		if(result.state !== estadosRespuesta.OK)
			return result;

		result.response.nombres_posibles = resultPictograma.response.nombres;
		result.response.pictograma = resultPictograma.response;
		delete result.response.pictograma.nombres;

		return result;
	},


	finalizarJugada: async function (idJugada, resultado) {
		//TODO: chequear que el paciente le pertenezca al usuario logueado

		const result = await jugadaDAO.finish(idJugada, resultado);

		return result;
	}

}


module.exports = jugadaService;