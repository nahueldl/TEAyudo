const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');

const traduccionDAO = {
    createTraduccion: async function(frase, idPaciente){
        if(frase == undefined || frase == null || idPaciente == undefined || idPaciente == null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'No hay pictogramas o paciente asociado'
			}
			return result;
        }
             
        //NOTA: traigo cualquiera de los nombres de todos los del pictograma
        const params = [
            {
				name: "id_paciente",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: idPaciente
			},
			{
				name: "frase_traducida",
				type: sql.NVarChar(255),
				value: frase
			}
		]
		const result = await genericDAO.runQuery('insert into Traduccion (id_paciente, frase_traducida) output inserted.id_traduccion values (@id_paciente, @frase_traducida)', params);
		const idInsertado = result.response[0].id_traduccion;
		result.response = idInsertado;

		return result;
		
	},
	
	insertIntermediateTable: async function(idTraduccion, idPictograma){
		if(idTraduccion == undefined || idTraduccion == null || idPictograma == undefined || idPictograma == null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'No hay traduccion o pictograma asociado'
			}
			return result;
		}
		
		const params = [
            {
				name: "id_traduccion",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: idTraduccion
			},
			{
				name: "id_pictograma",
				type: sql.Numeric(18,0),
				value: idPictograma
			}
		]

		const result = await genericDAO.runQuery('insert into Traduccion_Pictograma (id_traduccion, id_pictograma) values (@id_traduccion, @id_pictograma)', params);
	}
};

module.exports = traduccionDAO;