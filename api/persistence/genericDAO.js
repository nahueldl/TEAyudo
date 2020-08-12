const sql = require('mssql');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');

// const connecionUrl = `mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=${process.env.dbencypt}`;
const connectionConfig = {
	user: process.env.dbuser,
	password: process.env.dbpass,
	server: process.env.dbservername,
	port: parseInt(process.env.dbport),
	database: process.env.dbname,
	parseJSON: true,
	options: {
		"enableArithAbort": false,
		"encrypt": (process.env.dbencypt == 'true'),
		"useUTC": false,
		"parseJSON": true
	}
};

const genericDAO = {

	runQuery: async function (query, params, options){
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';
		if(isNullOrUndefined(params) || params.length < 1) throw 'no se han definido parametros';

		if(isNullOrUndefined(options)) options = {};
		options.returnOneRecorset = options.returnOneRecorset || true;
		options.transaction = options.transaction || null;
		
		const res = {
			state: null,
			response: null
		};

		let pool;

		try{
			let request;

			if(isNullOrUndefined(options.transaction)){
				pool = await sql.connect(connectionConfig);
				request = pool.request();
			}else{
				request = new sql.Request(options.transaction);
			}

			params.forEach(param => {
				if(isNullOrUndefined(param.type))
					request.input(param.name, param.value)
				else
					request.input(param.name, param.type, param.value)
			});

			const result = await request.query(query);

			res.state = estadosRespuesta.OK;

			if(options.returnOneRecorset) res.response = result.recordsets[0];
			else res.response = result.recordsets;

		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = err;
			console.log(err);
		}
		
		if(!isNullOrUndefined(pool)) pool.close();
		return res;
	},


	runSimpleQuery: async (query) => await this.runQuery(query),


	insert: async function (table, options){
		if(isNullOrUndefined(table)) throw 'table no ha sido definida';

		if(isNullOrUndefined(options)) options = {};
		options.transaction = options.transaction || null;

		const res = {
			state: null,
			response: null
		};

		let pool = null;

		try{
			let request;

			if(isNullOrUndefined(options.transaction)){
				pool = await sql.connect(connectionConfig);
				request = await new sql.Request();
			}else{
				request = new sql.Request(options.transaction);
			}
			
			const result = await request.bulk(table);
			res.state = estadosRespuesta.OK;
			res.response = null;
			}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = err;
			console.log(err);
		}
		
		if(!isNullOrUndefined(pool)) sql.close();
		return res;
	},

	openTransaction: async function(){
		const pool = await sql.connect(connectionConfig);
		const transaction = new sql.Transaction(pool);
		return transaction;
	}

}

module.exports = genericDAO;