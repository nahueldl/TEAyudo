const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');


const rolDAO = {
	
	getAll: async function (){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runSimpleQuery("select * from Rol");
	},


	getById: async function (id){
		if(isNullOrUndefined(id)) throw 'parametro id no ha sido definido';

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Rol where id_rol = @id", params);

		if(result.state && result.response.length < 1){
			result.state = false;
			result.response = "No se encontro un rol con ese id";
		}else if(result.state){
			result.response = result.response[0];
		}
		
		return result;
	}
	
};


module.exports = rolDAO;