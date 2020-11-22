const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');


const informeDAO = {
	insert: async function (informe){
		if(informe == undefined || informe == null || informe < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El informe no esta definido'
			}
			return result;
		}


		//Pensar como voy a hacer el INSERT, seguro lo de abajo esta mal
		const tablaInforme = new sql.Table('Informe');
		//tablaInforme.columns.add('id_usuario_rol', sql.Numeric(18,0), {nullable: false});
		tablaInforme.columns.add('id_paciente', sql.Numeric(18,0), {nullable: false});
		tablaInforme.columns.add('fecha_hora', sql.DateTime, {nullable: true});

		tablaInforme.rows.add(
		//	informe.id_usuario_rol,
			informe.id_paciente,
			informe.fecha_hora
		);

		return genericDAO.insert(tablaInforme);
	}
}


module.exports = informeDAO;