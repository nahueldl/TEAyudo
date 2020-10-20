const informeDAO = require('../persistence/informeDAO');
const estadisticaDAO = require('../persistence/estadisticaDAO');
const imageDownloaderService = require('../services/imageDownloaderService');
const estadosRespuesta = require('../models/estados_respuesta');
const Handlebars = require("handlebars");
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

const informeService = {

	getById: async function(id_informe, usuario){
		//Aca iría la lógia de negocio
		return await informeDAO.getById(parseInt(id_informe), usuario.id_usuario);
	},

	//getPDF
	insert: async function(categoria, usuario, res){

		const ruta = path.join(__dirname, '../templates/informe.hbs');

		const handlebars = fs.readFileSync(path.join(__dirname, '../templates/informe.hbs'), "utf8");
		
		let source2 = handlebars;

		let template = Handlebars.compile(source2);

		let data = 
		{
			"nombrePaciente": "Juan Carlos",
			"tiempoRespuesta": "16s",
			"porcentejeRespuestas": "76.42%",
			"cantidadJugadas": "24",
			"fecha": (new Date()).toLocaleDateString(),
			"cantPictogramasPromedio": "3.26",
			"categoriasMasUsadas": [
				{
					"pos": "1",
					"nombre": "Equipo De Proteccion",
					"algoMas": "blah"
				},
				{
					"pos": "2",
					"nombre": "Equipo Medico",
					"algoMas": "blah"
				},
				{
					"pos": "3",
					"nombre": "Verbo",
					"algoMas": "blah"
				}
			],
			"pictogramasMasUsados": [
				{
					"pos": "1",
					"nombre": "persona con pantalla",
					"algoMas": "blah"
				},
				{
					"pos": "2",
					"nombre": "quitar el guante",
					"algoMas": "blah"
				},
				{
					"pos": "3",
					"nombre": "quitar cubrezapatos",
					"algoMas": "blah"
				}
			],
			"pictogramaMasUsado": null
		};

	
		const resultPictogramasMasUsados = await estadisticaDAO.getPictogramasMasUsados(1, new Date());

		if(resultPictogramasMasUsados.state === estadosRespuesta.OK){
			data.pictogramasMasUsados = resultPictogramasMasUsados.response;
			data.pictogramaMasUsado = await imageDownloaderService.downloadBase64Img(resultPictogramasMasUsados.response[0].url);
		}

		let resultado = template(data);

	   
		//Renderizacion y creacion del PDF
		let informe = null;
		
		const html = resultado; //esto deberia tomar el result de arriba

		// res.status(200);
		// res.send(resultado);

		const options = { format: 'A4' };

		pdf.create(html, options).toStream((err, stream) => {
			if(err === undefined || err === null){
				res.setHeader('Content-Type', 'application/pdf');
				res.status(200);
				stream.pipe(res);
			}
		});

	}

}

module.exports = informeService;