const sql = require('mssql');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');

const connecionUrl = `mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=${process.env.dbencypt}`;
const connectionObject = {
	user: process.env.dbuser,
	password: process.env.dbpass,
	server: process.env.dbservername,
	port: parseInt(process.env.dbport),
	database: process.env.dbname,
	options: {
		"enableArithAbort": false,
		"encrypt": (process.env.dbencypt == 'true'),
		"useUTC": false
	}
};

const genericDAO = {

	runSimpleQuery: async function (query, returnOneRecorset=true){
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';

		const res = {
			state: null,
			response: null
		};

		try{
			await sql.connect(connectionObject);
			const result = await sql.query(query);
			res.state = estadosRespuesta.OK;
			if(returnOneRecorset) res.response = result.recordsets[0];
			else res.response = result.recordsets;
		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = err;
			console.log(err);
		}

		sql.close();
		return res;
	},


	runQuery: async function (query, params, returnOneRecorset=true){
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';
		if(isNullOrUndefined(params) || params.length < 1) throw 'no se han definido parametros';

		const res = {
			state: null,
			response: null
		};

		try{
			const pool = await sql.connect(connectionObject);
			const request = pool.request();
			params.forEach(param => {
				if(isNullOrUndefined(param.type))
					request.input(param.name, param.value)
				else
					request.input(param.name, param.type, param.value)
			});
			const result = await request.query(query);
			res.state = estadosRespuesta.OK;
			if(returnOneRecorset) res.response = result.recordsets[0];
			else res.response = result.recordsets;
		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = err;
			console.log(err);
		}
		
		sql.close();
		return res;
	},


	insert: async function (table){
		if(isNullOrUndefined(table)) throw 'table no ha sido definida';

		const res = {
			state: null,
			response: null
		};

		try{
			await sql.connect(connectionObject);
			const result = await new sql.Request().bulk(table);
			res.state = estadosRespuesta.OK;
			res.response = null;
			}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = err;
			console.log(err);
		}
		
		sql.close();
		return res;
	}
}

module.exports = genericDAO;