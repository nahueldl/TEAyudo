const http = require('http');
const jsreport = require('jsreport');
const informeDAO = require('../persistence/informeDAO');

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

// const informeService = {
//   insert: async function(informe){
//     return await informeDAO.insert(informe);
// 	}
// }