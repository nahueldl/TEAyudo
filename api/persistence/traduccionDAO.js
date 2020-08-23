const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');

const traduccionDAO = {
    createTraduccion: async function(listaPictogramas, idPaciente){
        if(isNullOrUndefined(listaPictogramas || idPaciente) || listaPacientes.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'No hay pictogramas o paciente asociado'
			}
			return result;
        }

        let traduccion;
        //for recorre toda la listaPictogramas y trae los datos, toma el nombre y lo concatena a la traduccion
        for(let i = 0; i <listaPictogramas.length; i++){
            //concatenar en la traduccion los nombres de los pictos
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
				value: traduccion
			}
		]
		const result = await genericDAO.runQuery('insert into Traduccion (id_paciente, frase_traducida) output inserted.id_traduccion values (@id_paciente, @frase_traducida)', params);
		const idInsertado = result.response[0].id_traduccion;
		result.response = idInsertado;

		return result;

		/*
        const tablaTraduccion = new sql.Table('Traduccion');
		tablaTraduccion.columns.add('id_paciente', sql.Numeric(18,0), {nullable: false});
		tablaTraduccion.columns.add('frase_traducida', sql.NVarChar(255), {nullable: false});
		//puedo omitir la fecha de creacion???
        		
			tablaTraduccion.rows.add(
				idPaciente,
				traduccion
			);
                
		return genericDAO.insert(tablaTraduccion);
		*/
    }
};

module.exports = traduccionDAO;