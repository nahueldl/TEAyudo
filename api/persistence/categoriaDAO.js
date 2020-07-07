const genericDAO = require('./genericDAO')

const categoriaDAO = {
	getAll: async function (){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runQuery("select * from Categoria");
	},
	get: async function (id){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runQuery("select * from Categoria");
	}
};

module.exports = categoriaDAO;