const estadosRespuesta = require('../models/estados_respuesta');
const { isNullOrUndefined } = require('util');
const { chownSync } = require('fs');
const axios = require('axios').default;
const USUARIO=String(process.env.USUARIOMATRICULA);
const CLAVE=String(process.env.CLAVEMATRICULA);


const matriculaService = {

    checkMatricula: async function(datosProfesional){
          
        const response = await axios.get('https://sisa.msal.gov.ar/sisa/services/rest/profesional/obtener', {
          params: {
            usuario: USUARIO,
            clave: CLAVE,
            apellido: datosProfesional.apellido,
            nombre: datosProfesional.nombre,
            nrodoc: datosProfesional.dni
        }
        })
       console.log((await response).data);
       const resultadoConsulta = (await response).data.resultado;
       
       if(resultadoConsulta=='REGISTRO_NO_ENCONTRADO'){
        const result = {
          state: estadosRespuesta.USERERROR,
          response: 'No se encontro una matricula, por favor revise nombre, apellido y dni del profesional'
          }
          return result;
        }
      //hacer que busque en las varias matriculas si las hubiera, no solo la primera

      let matriculaProf=-1;
      let estado='No encontrado';

      for(let i = 0; i <response.data.matriculas.length; i++){
        if(datosProfesional.matricula == parseInt(response.data.matriculas[i].matricula)){
          matriculaProf = parseInt(response.data.matriculas[i].matricula);
          estado = response.data.matriculas[i].estado; 
          break;
        }
      }    
      //const matriculaProf = parseInt((await response).data.matriculas[0].matricula);
      //la posicion del array del estado deberia ser la misma a la de la matricula encontrada  
      //const estado = (await response).data.matriculas[0].estado; 

      if(matriculaProf == datosProfesional.matricula && estado == 'Habilitado'){
        const result = {
          state: estadosRespuesta.OK,
          response: 'Existe un profesional habilitado con esa matricula'
          }
          return result;
        }else if(matriculaProf != datosProfesional.matricula){
          const result = {
            state: estadosRespuesta.USERERROR,
            response: 'La matricula ingresada es distinta a la que tiene asignada el profesional, pruebe ingresarla nuevamente'
            }
          return result;
        }else if(estado != 'Habilitado'){
          const result = {
            state: estadosRespuesta.USERERROR,
            response: 'El profesional no se encuentra habilitado según el Ministerio de Salud'
            }
          return result;
        }        
      }
    
  
};

module.exports = matriculaService;


//Por las dudas dejo esto acá si lo tengo que usar de otra manera para la consulta a la API
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
