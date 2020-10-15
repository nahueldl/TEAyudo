const http = require('http');
const informeDAO = require('../persistence/informeDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const Handlebars = require("handlebars");
const ts = require('stream').Transform();
const pdf = require('html-pdf');
//let inf = require('./informe.hbs');
const fs = require('fs');
const path = require('path');
const Chart = require('chart.js');

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

		const handlebars = fs.readFileSync(path.join(__dirname, '../templates/informe.hbs'), "utf8");
		
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






/*
<!DOCTYPE html>
<html lang="en"> 
  
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content= 
        "width=device-width, initial-scale=1.0"> 
  
    <title>Pie Chart</title> 
  
    <style> 
        .piechart { 
            margin-top: 300px; 
            display: block; 
            position: absolute; 
            width: 400px; 
            height: 400px; 
            border-radius: 50%; 
            background-image: conic-gradient( 
                pink 70deg,  
                lightblue 0 235deg,  
                orange 0); 
        } 
  
        body, 
        .piechart { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
        } 
    </style> 
</head> 
  
<body> 
    <h1>Pie Chart</h1> 
    <div class="piechart"></div> 
    <script> src="informeService.js" </script>
    <script id="informe" type="text/x-handlebars-template">
</body> 
  
</html> 
*/