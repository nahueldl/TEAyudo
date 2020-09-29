const http = require('http');
const informeDAO = require('../persistence/informeDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const Handlebars = require("handlebars");
const ts = require('stream').Transform();
const pdf = require('html-pdf');
//let inf = require('./informe.hbs');
const fs = require('fs');
const path = require('path');


const informeService = {

	getById: async function(id_informe, usuario){
		//Aca iría la lógia de negocio
		return await informeDAO.getById(parseInt(id_informe), usuario.id_usuario);
	},

	insert: async function(categoria, usuario, res){

		//Utilizacion de handlebars para darle forma al PDF
		/*
		let source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
					"{{kids.length}} kids:</p>" +
					"<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";*/

		const ruta = path.join(__dirname, '../templates/informe.hbs');

		const handlebars = fs.readFileSync(path.join(__dirname, '../templates/informe.hbs'));
		
		let source2 = handlebars;

		let template = Handlebars.compile(source2);
		
		let data = { "name": "Alan", "hometown": "Somewhere, TX",
					"kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
		let resultado = template(data);

	   
		//Renderizacion y creacion del PDF
		let informe = null;
		
		const html = resultado; //esto deberia tomar el result de arriba
		const options = { format: 'A4' };
		
		pdf.create(html, options).toStream((err, stream) => {
			if(err === undefined || err === null){
				res.setHeader('Content-Type', 'application/pdf');
				res.status(200);
				stream.pipe(res);
				// res.end();
			}
		});

		//Si alguien ve este pieza de codigo me asesinan
		// while(informe === null){
		// 	setTimeout(() =>{},50);
		// }

	}

}

module.exports = informeService;