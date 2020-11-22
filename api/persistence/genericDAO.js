const sql = require('mssql');
const estadosRespuesta = require('../models/estados_respuesta');

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

	runQuery: async function (query, params = [], options = {}){
		if(query === undefined || query === null) throw 'query no ha sido definida';

		options.returnOneRecorset = options.returnOneRecorset || true;
		options.transaction = options.transaction || null;
		
		const res = {
			state: null,
			response: null
		};

		let pool;

		try{
			let request;

			if(options.transaction === undefined || options.transaction === null){
				pool = await sql.connect(connectionConfig);
				request = pool.request();
			}else{
				request = new sql.Request(options.transaction);
			}

			params.forEach(param => {
				if(param.type === undefined || param.type === null)
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
		
		if(!(pool === undefined || pool === null)) pool.close();
		return res;
	},

	insert: async function (table, options){
		if(table === undefined || table === null) throw 'table no ha sido definida';

		if(options === undefined || options === null) options = {};
		options.transaction = options.transaction || null;

		const res = {
			state: null,
			response: null
		};

		let pool = null;

		try{
			let request;

			if(options.transaction === undefined || options.transaction === null){
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
		
		if(!(pool === undefined || pool === null)) pool.close();
		return res;
	},

	openTransaction: async function(){
		const pool = await sql.connect(connectionConfig);
		const transaction = new sql.Transaction(pool);
		return transaction;
	}

}

module.exports = genericDAO;