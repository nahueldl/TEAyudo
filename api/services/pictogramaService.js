const pictogramaDAO = require('../persistence/pictogramaDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const imageUploaderService = require('./imageUploaderService');
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


	getByNombre: async function (nombre, paciente){
		if(isNullOrUndefined(nombre) || nombre.length < 3){
			return {
				state: estadosRespuesta.USERERROR,
				response: 'No se puede realizar una busqueda para menos de 3 caracteres'
			};
		}
		if(isNullOrUndefined(paciente))
			return await pictogramaDAO.findByNombre(nombre);
		else
			return await pictogramaDAO.findByNombre(nombre, parseInt(paciente));
	},


	customizePictograma: async function (usuario, idPictograma, infoPictograma){
		// if(isNullOrUndefined(idPictograma) || isNullOrUndefined(infoPictograma.paciente) || (isNullOrUndefined(infoPictograma.nombre) && isNullOrUndefined(infoPictograma.favorito))){
		// 	return {
		// 		state: estadosRespuesta.USERERROR,
		// 		response: 'Faltan definir datos'
		// 	};
		// }
		return await pictogramaDAO.customizePictograma(idPictograma, infoPictograma.paciente, infoPictograma.nombre, infoPictograma.favorito, infoPictograma.estado);
	},


	addPictograma: async function(usuario, data){
		if(isNullOrUndefined(data.categoria) || isNullOrUndefined(data.base64img) || isNullOrUndefined(data.nombres)){
			return {
				state: estadosRespuesta.USERERROR,
				response: 'Faltan definir parametros'
			};
		}
		
		
		const result = await imageUploaderService.uploadImage(null, data.base64img, "png");
		
		let result2;

		if(result.state === estadosRespuesta.OK)
			result2 = await pictogramaDAO.createPictograma(data.categoria, data.nombres, data.etiquetas, data.esquematico, data.sexo, data.violencia, 1, null, result.response);
		else
			return result;


		if(result2.state === estadosRespuesta.OK)
			return await pictogramaDAO.getById(result.response.id_pictograma);
		else
			return result2;

	}

}


module.exports = pictogramaService;