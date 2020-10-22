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

	},


	getCategoriasMasUsadas: async function (pacienteId, fecha){

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

		const result = await genericDAO.runQuery("select top 3 ROW_NUMBER() OVER (ORDER BY count(*) desc) pos, c.nombre from Traduccion t inner join Traduccion_Pictograma tp on tp.id_traduccion = t.id_traduccion inner join Pictograma p on p.id_pictograma = tp.id_pictograma inner join Categoria_Pictograma cp on cp.id_pictograma = p.id_pictograma inner join Categoria c on c.id_categoria = cp.id_categoria where t.id_paciente = @id and (t.fecha_hora between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) group by c.id_categoria, c.nombre, t.id_paciente order by count(*) desc", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron categorias usadas";
		}
		return result;

	},


	getPromedioTraduccion: async function (pacienteId, fecha){

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

		const result = await genericDAO.runQuery("select ISNULL(ROUND(AVG(CAST(cantidad AS FLOAT)), 2),0) promedio FROM (select count(*) cantidad from Traduccion t inner join Traduccion_Pictograma tp on tp.id_traduccion = t.id_traduccion where t.id_paciente = @id and (t.fecha_hora between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) group by t.id_traduccion) as tabla", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron categorias usadas";
		}else{
			result.response = result.response[0];
		}
		return result;

	},


	getTiempoPromedioJuego: async function (pacienteId, fecha){

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

		const result = await genericDAO.runQuery("select ISNULL(ROUND(AVG(CAST(DATEDIFF(s, fecha_hora_alta, fecha_hora_respuesta) AS FLOAT)), 2), 0) promedio from Jugada where id_paciente = @id and (fecha_hora_alta between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) and respondio_correctamente is not null and fecha_hora_respuesta is not null", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron categorias usadas";
		}else{
			result.response = result.response[0];
		}
		return result;

	},

	getCantidadJugadas: async function (pacienteId, fecha){

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

		const result = await genericDAO.runQuery("select count(*) cantidad from Jugada where id_paciente = @id and (fecha_hora_alta between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) and respondio_correctamente is not null and fecha_hora_respuesta is not null", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron categorias usadas";
		}else{
			result.response = result.response[0];
		}
		return result;

	},

	getJugadasCorrectas: async function (pacienteId, fecha){

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

		const result = await genericDAO.runQuery("select ISNULL(ROUND(CAST((select count(*) from Jugada where id_paciente = @id and (fecha_hora_alta between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha)) and respondio_correctamente = 1) AS FLOAT) / ISNULL(CAST((select count(*) from Jugada where id_paciente = @id and (fecha_hora_alta between DATEADD(month, -1, @fecha) and DATEADD(day, 1, @fecha))) AS FLOAT), 1)*100, 2), 0) as porcentaje", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontraron categorias usadas";
		}else{
			result.response = result.response[0];
		}
		return result;

	}


}


module.exports = estadisticaDAO;