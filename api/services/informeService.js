const informeDAO = require('../persistence/informeDAO');
const estadisticaDAO = require('../persistence/estadisticaDAO');
const pacienteService = require('../services/pacienteService')
const imageDownloaderService = require('../services/imageDownloaderService');
const estadosRespuesta = require('../models/estados_respuesta');
const Handlebars = require("handlebars");
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const rolService = require('../services/rolService');

const informeService = {

	getById: async function(id_informe, usuario){
		//Aca iría la lógia de negocio
		return await informeDAO.getById(parseInt(id_informe), usuario.id_usuario);
	},

	//getPDF
	getPDF: async function(usuario, paciente, fecha, res){

		//falta
		//agregar la fecha para la que quiere generar el informe
		//guardar el registro de la generacion
		//agregar intervalo de tiempo variable

		//TODO: BORRARR ESTOOO
		const resultUsuarioRol = await rolService.getUsuarioRol(usuario.id_usuario, 2);

		if(resultUsuarioRol.state !== estadosRespuesta.OK){
			res.status(403).json({msg: "El usuario no tiene los permisos"});
			return;
		}

		let date;
		if(fecha === undefined || fecha === null)
			date = new Date();
		else{
			date = new Date(fecha);
		}

		const informe = {
			"id_paciente": paciente,
			"id_usuario_rol": resultUsuarioRol.response.id_usuario_rol,
			"fecha_hora": date
		}

		informeDAO.insert(informe);
		
		const hbs = fs.readFileSync(path.join(__dirname, '../templates/informe.hbs'), "utf8");

		const template = Handlebars.compile(hbs);

		const data = {
			"nombrePaciente": null,
			"tiempoRespuesta": null,
			"porcentejeRespuestas": null,
			"cantidadJugadas": null,
			"fecha": date.toLocaleDateString(),
			"cantPictogramasPromedio": null,
			"categoriasMasUsadas": null,
			"pictogramasMasUsados": null,
			"pictogramaMasUsado": null
		};

		//Nombre del paciente
		const resultPaciente = await pacienteService.getById(paciente, usuario);

		if(resultPaciente.state === estadosRespuesta.OK){
			data.nombrePaciente = resultPaciente.response.nombre + " " + resultPaciente.response.apellido;
		}else{
			res.status(404).json({msg: "No se encontro un paciente con ese id asociado al usuario logueado"});
			return;
		}
		

		//Estadisticas de pictograma
		const resultPictogramasMasUsados = await estadisticaDAO.getPictogramasMasUsados(paciente, new Date());

		if(resultPictogramasMasUsados.state === estadosRespuesta.OK){
			data.pictogramasMasUsados = resultPictogramasMasUsados.response;
			data.pictogramaMasUsado = await imageDownloaderService.downloadBase64Img(resultPictogramasMasUsados.response[0].url);
		}

		//Estadisticas de categorias
		const resultCategoriasMasUsadas = await estadisticaDAO.getCategoriasMasUsadas(paciente, new Date());

		if(resultCategoriasMasUsadas.state === estadosRespuesta.OK){
			data.categoriasMasUsadas = resultCategoriasMasUsadas.response;
		}

		//Estadisticas de traduccion
		const resultPromedioTraduccion = await estadisticaDAO.getPromedioTraduccion(paciente, new Date());

		if(resultPromedioTraduccion.state === estadosRespuesta.OK){
			data.cantPictogramasPromedio = (Math.round(resultPromedioTraduccion.response.promedio * 100) / 100).toFixed(2);
		}

		//Estadisticas de Juegos
		const resultTiempoPromedioJuego = await estadisticaDAO.getTiempoPromedioJuego(paciente, new Date());

		if(resultTiempoPromedioJuego.state === estadosRespuesta.OK){
			data.tiempoRespuesta = (Math.round(resultTiempoPromedioJuego.response.promedio * 100) / 100).toFixed(2) + "s";
		}

		const resultCantidadJugadas = await estadisticaDAO.getCantidadJugadas(paciente, new Date());

		if(resultCantidadJugadas.state === estadosRespuesta.OK){
			data.cantidadJugadas = resultCantidadJugadas.response.cantidad;
		}

		const resultJugadasCorrectass = await estadisticaDAO.getJugadasCorrectas(paciente, new Date());

		if(resultJugadasCorrectass.state === estadosRespuesta.OK){
			data.porcentejeRespuestas = resultJugadasCorrectass.response.porcentaje + "%";
		}

		const html = template(data);

		//Si quiero devolver un HTML (pruebas)
		// res.status(200);
		// res.send(html);

		//Si quiero devolver un PDF
		pdf.create(html, { format: 'A4' }).toStream((err, stream) => {
			if(err === undefined || err === null){
				res.setHeader('Content-Type', 'application/pdf');
				res.status(200);
				stream.pipe(res);
			}
		});

	}

}

module.exports = informeService;