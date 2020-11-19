const estadosRespuesta = require('../models/estados_respuesta');
const pictogramaService = require('../services/pictogramaService');
const traduccionDAO = require('../persistence/traduccionDAO');

const traduccionService = {
	insert: async function(listaPictogramas, idPaciente){

		let frase = '';
		//voy creando la frase, si tiene nombre pers. el picto meto ese, sino el generico
		for(let i = 0; i <listaPictogramas.length; i++){
			const pictogramas = await pictogramaService.getById(listaPictogramas[i].id, parseInt(idPaciente));
			if(pictogramas.state == 0){
				const result = {
					state: estadosRespuesta.USERERROR,
					response: 'No se encontro un pictograma. Revisar que paciente exista o que tenga el/los pictogramas'
				}
				return result;
			}else if(pictogramas.response.nombre_personalizado != null){
					palabra = pictogramas.response.nombre_personalizado
					frase += palabra + ' ';
				}else{
					palabra = pictogramas.response.nombres[0].nombre;
					frase += palabra + ' ';
				}
				//el ultimo pedazo de la frase queda con un espacio en blanco :(
		}

		const result = await traduccionDAO.createTraduccion(frase, idPaciente);

		//no seria mejor preguntar si el estado es OK justamente, para crear al otro??
		if(result.state != estadosRespuesta.OK){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'Hubo un error al intentar crear la traducción'
			}
			return result;
		}

		//si esta bien la traduccion con los pictogramas, inserto las tablas intermedias
		if(result.state == estadosRespuesta.OK){
			let idTraduccion = result.response;
			for(let i = 0; i <listaPictogramas.length; i++){
				const resultado = await traduccionDAO.insertIntermediateTable(idTraduccion, listaPictogramas[i].id);
			}
			if(result.state === estadosRespuesta.OK)
				result.response = frase;
			return result;
		}
	}
};

module.exports = traduccionService;