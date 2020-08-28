const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');


const jugadaDAO = {
	create: async function (idPaciente, nivel) {

		const result = await genericDAO.runQuery("INSERT INTO Jugada (id_paciente, nivel_juego) OUTPUT inserted.id_jugada VALUES (@idPaciente, @nivel)",[
			{
				name: "idPaciente",
				type: sql.Numeric(18,0),
				value: idPaciente
			},
			{
				name: "nivel",
				type: sql.Int,
				value: nivel
			}
		]);

		if(result.state === estadosRespuesta.OK)
			result.response = result.response[0];

		return result;
	},

	
	finish: async function (idJugada, resultado) {

		const result = await genericDAO.runQuery("UPDATE Jugada SET respondio_correctamente = @resultado, fecha_hora_respuesta = getdate() WHERE id_jugada = @idJugada",[
			{
				name: "idJugada",
				type: sql.Numeric(18,0),
				value: idJugada
			},
			{
				name: "resultado",
				type: sql.Bit,
				value: resultado
			}
		]);
		return result;
	}

}


module.exports = jugadaDAO;