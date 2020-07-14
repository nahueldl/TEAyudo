const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');


const categoriaDAO = {
	
	getAll: async function (id_usuario){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			}
		]

		return await genericDAO.runQuery("select ca.*, ro.id_rol, ro.descripcion as 'rol_descripcion' from Categoria ca left join Usuario_Rol ur on ca.id_usuario_rol = ur.id_usuario_rol left join rol ro on ro.id_rol = ur.id_rol where ca.id_usuario_rol is null or ur.id_usuario = @id", params);
	},


	getById: async function (id){
		if(isNullOrUndefined(id)){
			const result = {
				status: estadosRespuesta.USERERROR,
				response: 'id no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Categoria where id_categoria = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro una categoria con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (listaCategorias){
		if(isNullOrUndefined(listaCategorias) || listaCategorias.length < 1){
			const result = {
				status: estadosRespuesta.USERERROR,
				response: 'categorias no esta definida o no contiene elementos'
			}
			return result;
		}

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