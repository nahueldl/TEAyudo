const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');
const axios = require('axios').default;

axios({
    method: 'get',
    url: 'https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener',
    params: {
        usuario: "***REMOVED***",
        clave: "***REMOVED***"
    },
    responseType: 'stream'
  })
    .then(function (response) {
      response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
    });