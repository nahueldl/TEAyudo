const categoriaDAO = require('../persistence/categoriaDAO');
const rolService = require('./rolService')


const categoriaService = {

	getAll: async function(usuario){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getAll(usuario.id_usuario);
	},


	getById: async function(id){
		//Aca iría la lógia de negocio
		return await categoriaDAO.getById(parseInt(id));
	},


	insert: async function(categoria, usuario){
		//TODO if categoria.id_rol = null ERRORRRRRRRRRRRORRRR
		const result = await rolService.getUsuarioRol(usuario.id_usuario, categoria.id_rol);
		//TODO if status is not ok ERORRRROROROROROR
		categoria.id_usuario_rol = result.response.id_usuario_rol;

		const categorias = [];
		categorias.push(categoria);
		
		return await categoriaDAO.insert(categorias);
	}
	
};


module.exports = categoriaService;