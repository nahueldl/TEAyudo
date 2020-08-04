const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');
const axios = require('axios').default;

const matriculaService = {

    checkMatricula: async function(){
      axios({
          method: 'get',
          url: 'https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener',
          params: {
              usuario: "fdgassino",
              clave: "F3d3R4D0r!",
              apellido: "Mazzocchi",
              nombre: "Sabrina"
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