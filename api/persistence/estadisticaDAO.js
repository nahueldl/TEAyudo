const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');


const estadisticaDAO = {

    getPictogramasMasUsados: async function (pacienteId, fecha){

		if(pacienteId == undefined || pacienteId == null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'pacienteId no esta definido'
			}
			return result;
		}

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: pacienteId
			},
			{
				name: "fecha",
				type: sql.DateTime,//Puedo no definir type y se infiere automaticamente
				value: fecha
			}
		]

		const result = await genericDAO.runQuery("select top 3 ROW_NUMBER() OVER (ORDER BY count(*) desc) pos, (select top 1 np.nombre from Nombre_Pictograma np where np.id_pictograma = tp.id_pictograma) nombre, p.ruta_acceso_local url from Traduccion t inner join Traduccion_Pictograma tp on tp.id_traduccion = t.id_traduccion inner join Pictograma p on p.id_pictograma = tp.id_pictograma where t.id_paciente = @id and (t.fecha_hora between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) group by tp.id_pictograma, t.id_paciente, p.ruta_acceso_local order by count(*) desc", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron picotramas usados";
		}
		return result;

	}

}


module.exports = estadisticaDAO;