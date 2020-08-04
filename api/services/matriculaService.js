const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');
const axios = require('axios').default;

const matriculaService = {

    checkMatricula: async function(){
      axios({
          method: 'get',
          url: 'https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener',
          params: {
              usuario: "***REMOVED***",
              clave: "***REMOVED***",
              apellido: "***REMOVED***",
              nombre: "***REMOVED***"
          },
          responseType: 'stream'
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
    }
};

module.exports = matriculaService;