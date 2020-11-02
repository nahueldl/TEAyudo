const sql = require('mssql');
const genericDAO = require('./genericDAO');
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
			return await genericDAO.runQuery("select ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta, ro.id_rol, ro.descripcion as 'rol_descripcion' from Categoria ca left join Usuario_Rol ur on ca.id_usuario_rol = ur.id_usuario_rol left join Rol ro on ro.id_rol = ur.id_rol where ur.id_usuario = @id and ca.activo = 1", params);
		else
			return await genericDAO.runQuery("select * from (select 0 as id_categoria, null as id_usuario_rol, 'Favoritos' as nombre, null as fecha_hora_alta where exists(select * from Pictograma_Paciente where id_paciente = @idPaciente and favorito is not null and favorito != 0) union select ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta from Categoria ca left join Usuario_Rol ur on ca.id_usuario_rol = ur.id_usuario_rol left join Rol ro on ro.id_rol = ur.id_rol left join Rol_Paciente rp on rp.id_usuario_rol = ur.id_usuario_rol where (ca.id_usuario_rol is null or ur.id_usuario = @id or rp.id_paciente = @idPaciente) and ca.activo = 1  group by ca.id_categoria, ca.id_usuario_rol, ca.nombre, ca.fecha_hora_alta ) as t order by (select id_categoria = 0) desc, (select isnull(count(*), 0) from Traduccion_Pictograma tp inner join Pictograma p on p.id_pictograma = tp.id_pictograma inner join Categoria_Pictograma cp on cp.id_pictograma = p.id_pictograma inner join Traduccion t on t.id_traduccion = tp.id_traduccion where cp.id_categoria = id_categoria and t.id_paciente = @idPaciente) desc, (select count(*) from Traduccion_Pictograma tp inner join Pictograma p on p.id_pictograma = tp.id_pictograma inner join Categoria_Pictograma cp on cp.id_pictograma = p.id_pictograma where cp.id_categoria = id_categoria) desc", params);
	},


	getById: async function (id){
		if(id === undefined || id === null){
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
		let result;
		if(id == 0)
			result = await genericDAO.runQuery("select 0 as id_categoria, null as id_usuario_rol, 'Favoritos' as nombre, null as fecha_hora_alta", params);
		else
			result = await genericDAO.runQuery("select * from Categoria where id_categoria = @id and activo = 1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro una categoria con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (categoria){
		if(categoria === undefined || categoria === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'categorias no esta definida o no contiene elementos'
			}
			return result;
		}

		const params = [
			{
				name: "idUR",
				type: sql.Numeric(18,0),
				value: categoria.id_usuario_rol || null,
			},
			{
				name: "nombre",
				type: sql.NVarChar(255),
				value: categoria.nombre
			},
			{
				name: "activo",
				type: sql.Bit,
				value: categoria.activo || true
			}
		];

		const insertResult = await genericDAO.runQuery("INSERT INTO Categoria (id_usuario_rol, nombre , activo) OUTPUT inserted.id_categoria VALUES (@idUR , @nombre, @activo)", params)
		if(insertResult.state !== estadosRespuesta.OK)
			return insertResult;
		insertResult.response = insertResult.response[0].id_categoria;
		return insertResult;
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
	},


	update: async function (idCategoria, nombre){
		if(idCategoria === null || idCategoria === undefined || nombre === null || nombre === undefined){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'Algun parámetro no fue definido'
			}
			return result;
		}

		const params = [
			{
				name: "idCategoria",
				type: sql.Numeric(18,0),
				value: idCategoria
			},
			{
				name: "nombre",
				type: sql.NVarChar(255),
				value: nombre
			}
		];

		return await genericDAO.runQuery("update Categoria set nombre = @nombre where id_categoria = @idCategoria", params);
	}

};


module.exports = categoriaDAO;
