const http = require('http');
const informeDAO = require('../persistence/informeDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const Handlebars = require("handlebars");


const informeService = {

    getById: async function(id_informe, usuario){
		//Aca iría la lógia de negocio
		return await informeDAO.getById(parseInt(id_informe), usuario.id_usuario);
	},

    insert: async function(categoria, usuario){

        //Utilizacion de handlebars para darle forma al PDF
        let source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
                    "{{kids.length}} kids:</p>" +
                    "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
        let template = Handlebars.compile(source);
        
        let data = { "name": "Alan", "hometown": "Somewhere, TX",
                    "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
        let resultado = template(data);

       
        //Renderizacion y creacion del PDF
        let informe;
        let fs = require('fs');
        let pdf = require('html-pdf');
        let html = resultado; //esto deberia tomar el result de arriba
        let options = { format: 'Letter' };
        
        pdf.create(html).toStream(async function(err, stream) {
            informe = stream;
         });

        const result = {
            state: estadosRespuesta.OK,
            response: informe
            }
            return result;       
        
    }

}

module.exports = informeService;