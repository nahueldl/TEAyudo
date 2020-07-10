const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');


const categoriaDAO = {
	
	getAll: async function (){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runSimpleQuery("select * from Categoria");
	},


	getById: async function (id){
		if(isNullOrUndefined(id)) throw 'parametro id no ha sido definido';

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Categoria where id_categoria = @id", params);

		if(result.state && result.response.length < 1){
			result.state = false;
			result.response = "No se encontro una categoria con ese id";
		}else if(result.state){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (listaCategorias){
		if(isNullOrUndefined(listaCategorias) || listaCategorias.length < 1) throw 'listaCategorias no esta definida o no contiene elementos';

		const tablaCategoria = new sql.Table('Categoria');
		tablaCategoria.columns.add('id_usuario_rol', sql.Numeric(18,0), {nullable: true});
		tablaCategoria.columns.add('nombre', sql.NVarChar(255), {nullable: false});
		tablaCategoria.columns.add('activo', sql.Bit, {nullable: false});

		listaCategorias.forEach(categoria => {
			tablaCategoria.rows.add(
				categoria.id_usuario_rol || null,
				categoria.nombre,
				categoria.activo || true
			);
		});

		return genericDAO.insert(tablaCategoria);
	}
};


module.exports = categoriaDAO;