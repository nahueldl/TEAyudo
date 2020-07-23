const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');


const pacienteDAO = {
	
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

		return await genericDAO.runQuery("select p.* from Paciente p join Rol_Paciente rp on rp.id_paciente=p.id_paciente join Usuario_Rol ur on rp.id_usuario_rol = ur.id_usuario_rol where ur.id_usuario=@id", params);
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

		const result = await genericDAO.runQuery("select * from Paciente where id_paciente = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un paciente con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (listaPacientes){
		if(isNullOrUndefined(listaPacientes) || listaPacientes.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'pacientes no esta definido o no contiene elementos'
			}
			return result;
		}
			
		const params = [
			{
				name: "nombre",
				type: sql.NVarChar(255),//Puedo no definir type y se infiere automaticamente
				value: listaPacientes[0].nombre
			},

			{
				name: "apellido",
				type: sql.NVarChar(255),//Puedo no definir type y se infiere automaticamente
				value: listaPacientes[0].apellido
			}
		]

		const result = await genericDAO.runQuery('INSERT INTO Paciente (nombre, apellido, activo) output inserted.id_paciente values (@nombre, @apellido, 1)', params);
		const idInsertado = result.response[0].id_paciente;
		result.response = idInsertado;

		return result;
	},

	//Inserta en la tabla Rol_Paciente el id_paciente pasado por parametro y el id_usuario_rol del usuario
	//que hace la petición 
	assingRolToPaciente: async function (id_usuario, id_paciente){
		/*if(isNullOrUndefined(listaRolPacientes) || listaRolPacientes.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'pacientes no esta definido o no contiene elementos'
			}
			return result;
		}*/

		const params = [
			{
				name: "id_usuario",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			}
		]

		const result = await genericDAO.runQuery("select ur.id_usuario_rol from Usuario u join Usuario_Rol ur on ur.id_usuario=u.id_usuario where u.id_usuario = @id_usuario", params);
		const usuario_rol = result.response[0].id_usuario_rol;

		const tablaRolPaciente = new sql.Table('Rol_Paciente');
		tablaRolPaciente.columns.add('id_paciente', sql.Numeric(18,0), {nullable: false});
		tablaRolPaciente.columns.add('id_usuario_rol', sql.Numeric(18,0), {nullable: false});
		tablaRolPaciente.columns.add('activo', sql.Bit, {nullable: false});

		
			tablaRolPaciente.rows.add(
				id_paciente,
				usuario_rol,
				true
			);
		

		return genericDAO.insert(tablaRolPaciente);
	},

	delete: async function(id_paciente){
		if(isNullOrUndefined(id_paciente)){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id del paciente no ha sido definido'
			}
			return result;
		}
		//TODOhacer chequeo si el usuario que va a realizar la baja tiene al paciente asociado
		const params = [
			{
				name: "id_paciente",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_paciente
			}
		]

		const result = await genericDAO.runQuery('update Paciente set activo = 0 output inserted.id_paciente where id_paciente =@id_paciente', params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un paciente con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}

		return result;
	}
}

module.exports = pacienteDAO;

//funcion para sacar el rol de un usuario dado su id --> deberia estar, como la pruebo?
//crear el insert para rol_paciente dependiendo de si lo esta haciendo un familiar o un profesional