const sql = require('mssql');
const { isNullOrUndefined } = require('util');

const genericDAO = {
	runSimpleQuery: async function (query){
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';

		const res = {
			state: null,
			response: null
		};

		try{
			await sql.connect(`mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=true`);
			const result = await sql.query(query);
			res.state = true;
			res.response = result.recordsets[0];
		}catch(err){
			res.state = false;
			res.response = err;
		}

		sql.close();
		return res;
	},
	runQuery: async function (query, params){//name type value
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';
		if(isNullOrUndefined(params) || params.length < 1) throw 'no se han definido parametros';

		const res = {
			state: null,
			response: null
		};

		try{
			const pool = await sql.connect(`mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=true`);
			const request = pool.request();
			params.forEach(param => {
				if(isNullOrUndefined(param.type))
					request.input(param.name, param.value)
				else
					request.input(param.name, param.type, param.value)
			});
			const result = await request.query(query);
			res.state = true;
			res.response = result.recordsets[0];
		}catch(err){
			res.state = false;
			res.response = err;
		}
		
		sql.close();
		return res;
	},
}

module.exports = genericDAO;