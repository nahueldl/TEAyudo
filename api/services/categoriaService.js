const categoriaDAO = require('../persistence/categoriaDAO');
const { insert } = require('../persistence/genericDAO');


categoriaService = {

	getAll: async function(){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll();
	},


	get: async function(id){
		//Aca iría la lógia de negocio
		return await categoriaDAO.get(parseInt(id));
	},


	insert: async function(categoria){
		//Aca iría la lógia de negocio

		//Aca debería chequear quien es el usuario logueado y con que rol y asignarle la categoria a el mismo
		//por ahora como no existe va un bello y harcodeado "1"
		categoria.id_usuario_rol = 1;
		const categorias = [];
		categorias.push(categoria);
		return await categoriaDAO.insert(categorias);
	}
	
};


module.exports = categoriaService;