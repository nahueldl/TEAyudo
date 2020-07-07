const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');

const categoriaDAO = {
	getAll: async function (){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runSimpleQuery("select * from Categoria");
	},
	get: async function (id){
		if(isNullOrUndefined(id)) throw 'parametro id no ha sido definido';

		const params = [
			{
				name: "id",
				type: sql.Int,//Puedo no definir type y se infiere automaticamente
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Categoria where id_categoria = @id", params);
		if(result.response.length < 1){
			result.state = false;
			result.response = "No se encontro una categoria con ese id";
		}
		return result;
	}
};

module.exports = categoriaDAO;