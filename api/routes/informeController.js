const http = require('http');
const jsreport = require('jsreport');
const express = require('express');
const router = express.Router();
const informeService = require('../services/informeService');
const isAuth = require('../middleware/auth').isAuth;
const estadosRespuesta = require('../models/estados_respuesta');
const { fstat } = require('fs');

// http.createServer((req, res) => {
//     jsreport.render({
//       template: {
//         content: '<h1>INFORME</h1>',
//         engine: 'handlebars',
//         recipe: 'chrone-pdf'
//       }
//     }).then((out)  => {
//       out.stream.pipe(res);
//     }).catch((e) => {
//       res.end(e.message);
//     });
//   }).listen(1337, '127.0.0.1');
// Ejemplo de levantar un server para jsreport

//GET Informe by id
router.get('/:id', async (req, res) => {
	const result = await informeService.getById(req.params.id)

	if(result.state === estadosRespuesta.OK)
		res.status(200).json(result.response);
	else if(result.state === estadosRespuesta.USERERROR)
		res.status(404).json({msg: `No se encontro el informe con id=${req.params.id}`});
	else if(result.state === estadosRespuesta.SERVERERROR)
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
});

// GET Pdf
router.post('/get_pdf', function (req, res, next) {
	jsreport = require('jsreport')
	// var data = {}
	// var jsrender = require('jsrender')
	var html = '<h1>INFORME TEST TEAYUDO {{asd}} {{otro}}</h1>'
		jsreport.render({
		template: {
		  content: html,
		  engine: 'handlebars',
		//   o sino jsrender
		  shortid: 'r18kyD83ce',
		  recipe: 'phantom-pdf'
		},
		data: {
			asd: "PARA PACIENTES",
			otro: "MAS COSAS"
		}
	  }).then(function (resp) {
		// resp.result.pipe(fr.createWriteStream('./uplaods/'+new Date().getTime()+'.pdf', 'utf8'))
		fs.writeFileSync('report.pdf', resp.content)
		res.format({
			'application/pdf': function () {
				res.send(resp.content)
			}
		})
	  }).catch((e) => {
		res.end(e.message);
	  });
})

//POST Informe
router.post('/', isAuth, async (req, res) => {
	const result = await categoriaService.insert(req.body, req.user);
	if(result.state === estadosRespuesta.OK){
		res.status(200).json({msg: "El informe ha sido correctamente creado"});
	}else if(result.state === estadosRespuesta.SERVERERROR){
		res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
	}else if(result.state === estadosRespuesta.USERERROR){
		res.status(400).json({msg: result.response});
	}
});