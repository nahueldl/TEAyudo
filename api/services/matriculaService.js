const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');
const axios = require('axios').default;
var matriculaUsada;

const matriculaService = {

    checkMatricula: async function(datosProfesional){
      /*
      axios.get('https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener', {
        params: {
          usuario: "***REMOVED***",
          clave: "***REMOVED***",
          apellido: datosProfesional.apellido,
          nombre: datosProfesional.nombre
      }
      })
      .then((response) => {
        console.log(response.data);
        const matriculaProf = parseInt(response.data.matriculas[0].matricula);
        matriculaUsada = matriculaProf;
        const result = {
          state: estadosRespuesta.OK,
          response: response.data
        }
        return result;
      }, (error) => {
        console.log(error);
        const result = {
          state: estadosRespuesta.USERERROR,
          response: 'hubo un error en la consulta'
        }
      }); 

      if(matriculaUsada == datosProfesional.matricula){
        const result = {
          state: estadosRespuesta.OK,
          response: "Existe un profesional con esa matricula"
        }
        return result;
      }
      */

      
        const response = await axios.get('https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener', {
          params: {
            usuario: "***REMOVED***",
            clave: "***REMOVED***",
            apellido: datosProfesional.apellido,
            nombre: datosProfesional.nombre
        }
        })
       console.log((await response).data);
       const matriculaProf = parseInt((await response).data.matriculas[0].matricula);
                 
      if(matriculaProf == datosProfesional.matricula){
        const result = {
          state: estadosRespuesta.OK,
          response: 'Existe un profesional con esa matricula'
        }
        return result;
      }
    }
  
};

module.exports = matriculaService;