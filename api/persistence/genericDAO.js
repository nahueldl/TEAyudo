const sql = require('mssql');
const { isNullOrUndefined } = require('util');


const genericDAO = {

	runSimpleQuery: async function (query, returnOneRecorset=true){
		if(isNullOrUndefined(query)) throw 'query no ha sido definida';

		const res = {
			state: null,
			response: null
		};

		try{
			await sql.connect(`mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=true`);
			const result = await sql.query(query);
			res.state = true;
			if(returnOneRecorset) res.response = result.recordsets[0];
			else res.response = result.recordsets;
		}catch(err){
			res.state = false;
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
			if(returnOneRecorset) res.response = result.recordsets[0];
			else res.response = result.recordsets;
		}catch(err){
			res.state = false;
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
			await sql.connect(`mssql://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbservername}/${process.env.dbname}?encrypt=true`);
			const result = await new sql.Request().bulk(table);
			res.state = true;
			res.response = result;//sacar este resultado (dejar el null) es solo para ver que mierda devuelve un insert
		}catch(err){
			res.state = false;
			res.response = err;
			console.log(err);
		}
		
		sql.close();
		return res;
	}
}

module.exports = genericDAO;