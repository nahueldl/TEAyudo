const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');


const categoriaDAO = {
	
	getAll: async function (id_usuario, id_paciente = null){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			},
			{
				name: "idPaciente",
				type: sql.Numeric(18,0),
				value: id_paciente
			}
		]
		if(id_paciente === null)
			return await genericDAO.runQuery("select ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta, ro.id_rol, ro.descripcion as 'rol_descripcion' from Categoria ca left join Usuario_Rol ur on ca.id_usuario_rol = ur.id_usuario_rol left join rol ro on ro.id_rol = ur.id_rol where ur.id_usuario = @id and ca.activo = 1", params);
		else
			return await genericDAO.runQuery("select ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta from Categoria ca left join Usuario_Rol ur on ca.id_usuario_rol = ur.id_usuario_rol left join rol ro on ro.id_rol = ur.id_rol left join Rol_Paciente rp on rp.id_usuario_rol = ur.id_usuario_rol where ca.id_usuario_rol is null or ur.id_usuario = @id or rp.id_paciente = @idPaciente and ca.activo = 1 group by ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta", params);
	},


	getById: async function (id){
		if(isNullOrUndefined(id)){
			const result = {
				state: estadosRespuesta.USERERROR,
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

		const result = await genericDAO.runQuery("select * from Categoria where id_categoria = @id and ca.activo = 1", params);

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
				state: estadosRespuesta.USERERROR,
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
	},

	poseeCategoria: async function(idUsuario, idCategoria){
		if(idUsuario === null || idUsuario === undefined || idCategoria === null || idCategoria === undefined ){
			return null;
		}
		const params = [
			{
				name: "idUsuario",
				type: sql.Numeric(18,0),
				value: idUsuario
			},
			{
				name: "idCategoria",
				type: sql.Numeric(18,0),
				value: idCategoria
			}
		];

		const result = await genericDAO.runQuery("select ur.id_usuario_rol from Categoria c inner join Usuario_Rol ur on ur.id_usuario_rol = c.id_usuario_rol where c.id_categoria = @idCategoria and c.activo = 1 and ur.id_usuario = @idUsuario", params);

		if(result.state !== estadosRespuesta.OK){
			return result;
		}
		else if(result.response.length < 1){
			return {
				state: estadosRespuesta.USERERROR,
				response: "No existe relacion"
			}
		}else{
			return result;
		}
	},

	delete: async function (idCategoria){
		if(idCategoria === null || idCategoria === undefined){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'El id no fue definido'
			}
			return result;
		}

		const params = [
			{
				name: "idCategoria",
				type: sql.Numeric(18,0),
				value: idCategoria
			}
		];

		return await genericDAO.runQuery("update Categoria set activo = 0 where id_categoria = @idCategoria", params);
	}

};


module.exports = categoriaDAO;