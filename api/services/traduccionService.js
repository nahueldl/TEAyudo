const estadosRespuesta = require('../models/estados_respuesta');
const pictogramaService = require('../services/pictogramaService');
const traduccionDAO = require('../persistence/traduccionDAO');
const { isNullOrUndefined } = require('util');

const traduccionService = {
    insert: async function(listaPictogramas, idPaciente){
        const pictogramas = await pictogramaService.getById(listaPictogramas, idPaciente);
        const result = await traduccionDAO.createTraduccion(pictogramas, idPaciente);

        //no seria mejor preguntar si el estado es OK justamente, para crear al otro??
        if(result.state != estadosRespuesta.OK){
            const result = {
                state: estadosRespuesta.USERERROR,
                response: 'Hubo un error al intentar crear la traducción'
            }
            return result;
        }

        if(result.state == estadosRespuesta.OK){
            //aca hacer el insert de las tablas intermedias entre traduccion y picto, pedir el id de la trad
        }
    }
};

module.exports = traduccionService;