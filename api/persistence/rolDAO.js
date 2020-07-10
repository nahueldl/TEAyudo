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
	},


	getByUsuarioId: async function (id){
		if(isNullOrUndefined(id)) throw 'parametro id no ha sido definido';

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select r.* from Rol r inner join Usuario_Rol ur on r.id_rol = ur_id_rol where ur.id_usuario = @id", params);

		if(result.state && result.response.length < 1){
			result.state = false;
			result.response = "No se encontro ningun rol para ese id de usuario";
		}
		
		return result;
	},
	
	insertUsuarioRol: async function (idUsuario, idRol){
		if(isNullOrUndefined(idUsuario) || isNullOrUndefined(idRol)) throw 'idUsuario y/o idRol no estan definidos';

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
	}
};


module.exports = rolDAO;