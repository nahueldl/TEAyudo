const sql = require('mssql')

const abstractDAO = {
	runQuery: async function (query){
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
	}
}

module.exports = abstractDAO;