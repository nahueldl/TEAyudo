const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');


const rolDAO = {
	
	getAll: async function (){
		//aca irian las validaciones de datos, aca no va una mierda, es para cuando hay que meter
		//datos en la db que lleven el formato piola o devolverlos con un formato bonito
		return await genericDAO.runSimpleQuery("select * from Rol");
	},


	getById: async function (id){
		if(id === undefined || id === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id no ha sido definido'
			}
		}

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Rol where id_rol = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un rol con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	getByUsuarioId: async function (id){
		if(id === undefined || id === null) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select r.* from Rol r inner join Usuario_Rol ur on r.id_rol = ur.id_rol where ur.id_usuario = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ningun rol para ese id de usuario";
		}
		
		return result;
	},

	//Get descripcion del rol dado un id_usuario
	getDescripcionByUsuarioId: async function (id){
		if(id === undefined || id === null) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select r.descripcion from Rol r inner join Usuario_Rol ur on r.id_rol = ur.id_rol where ur.id_usuario = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ninguna descripcion de rol para ese id de usuario";
		}
		
		return result;
	},
	
	insertUsuarioRol: async function (idUsuario, idRol){
		if(idUsuario === undefined || idUsuario === null || idRol === undefined || idRol === null) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'idUsuario y/o idRol no estan definidos'
			}
			return result;
		}

		const tablaUsuarioRol = new sql.Table('Usuario_Rol');
		tablaUsuarioRol.columns.add('id_usuario', sql.Numeric(18,0), {nullable: false});
		tablaUsuarioRol.columns.add('id_rol', sql.Numeric(18,0), {nullable: false});
		tablaUsuarioRol.columns.add('activo', sql.Bit, {nullable: false});

		tablaUsuarioRol.rows.add(
			idUsuario,
			idRol,
			true
		);

		return genericDAO.insert(tablaUsuarioRol);
	},

	getUsuarioRol: async function (idUsuario, idRol){
		if(idUsuario === undefined || idUsuario === null || idRol === undefined || idRol === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'idUsuario y/o idRol no estan definidos'
			}
			return result;
		}
		
		const params = [
			{
				name: "idUsuario",
				type: sql.Numeric(18,0),
				value: idUsuario
			},
			{
				name: "idRol",
				type: sql.Numeric(18,0),
				value: idRol
			}
		]

		const result = await genericDAO.runQuery("select * from Usuario_Rol where id_usuario = @idUsuario and id_rol = @idRol", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ningun rol para ese id de usuario";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}

		return result;
	},

	getDescripcionById: async function(idRol){
		if(idRol === undefined || idRol === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'idRol no estan definidos'
			}
			return result;
		}

		const params = [
			{
				name: "idRol",
				type: sql.Numeric(18,0),
				value: idRol
			}
		]

		const result = await genericDAO.runQuery("select descripcion from Rol where id_rol=@idRol", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ninguna descripcion para ese idRol";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}

		return result;
	}

};


module.exports = rolDAO;