const sql = require('mssql');
const genericDAO = require('./genericDAO');
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

		return await genericDAO.runQuery("select p.* from Paciente p join Rol_Paciente rp on rp.id_paciente=p.id_paciente join Usuario_Rol ur on rp.id_usuario_rol = ur.id_usuario_rol where ur.id_usuario=@id and p.activo=1", params);
	},


	getById: async function (id_paciente, id_usuario){
		if(id_paciente === undefined || id_paciente === null){
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
				value: id_paciente
			},

			{
				name: "id_usuario",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			}
		]

		const result = await genericDAO.runQuery("select p.* from Paciente p join Rol_Paciente rp on rp.id_paciente=p.id_paciente join Usuario_Rol ur on ur.id_usuario_rol=rp.id_usuario_rol where p.id_paciente = @id and ur.id_usuario=@id_usuario and p.activo=1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un paciente con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (listaPacientes){
		if(listaPacientes === undefined || listaPacientes === null || listaPacientes.length < 1){
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
		/*if(listaRolPacientes === undefined || listaRolPacientes === null || listaRolPacientes.length < 1){
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

	assingProfesional: async function (listadoRequisitos,id_paciente, id_usuario){
		if(listadoRequisitos === undefined || listadoRequisitos === null || listadoRequisitos.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'faltan llenar uno o mas campos para asignar profesional'
			}
			return result;
		}

		const params = [
			{
				name: "id_usuario",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			},

			{
				name: "id_paciente",
				type: sql.Numeric(18,0),
				value: id_paciente
			},

			{
				name: "id_profesional",
				type: sql.Numeric(18,0),
				value: listadoRequisitos.id_profesional
			},

			{
				name: "nro_matricula",
				type: sql.NVarChar(40),
				value: listadoRequisitos.nro_matricula
			}
		]

		//query para ver si el usuario que hace la peticion tiene al paciente asociado y esta activo
		//(usar id_paciente y id_usuario), no me importa lo que me devuelve la query, me importa que traiga algo
		const result1 = await genericDAO.runQuery("select p.id_paciente from Usuario u join Usuario_Rol ur on ur.id_usuario=u.id_usuario join Rol_Paciente rp on rp.id_usuario_rol=ur.id_usuario_rol join Paciente p on p.id_paciente=rp.id_paciente where u.id_usuario=@id_usuario and p.id_paciente=@id_paciente and p.activo=1", params);
		if(result1.response[0] === undefined || result1.response[0] === null){
			const result1 = {
				state: estadosRespuesta.USERERROR,
				response: 'El usuario no tiene asignado al paciente'
			}
			return result1;
		}

		//query para chequear que el nro de matricula pasado sea el mismo que tiene el id del profesional pasado
		//(usar id_profesional y nro_matricula), no me importa lo que me devuelve la query, me importa que traiga algo
		const result2 = await genericDAO.runQuery("select id_usuario from Usuario where id_usuario=@id_profesional and nro_matricula=@nro_matricula", params);
		if(result2.response[0] === undefined || result2.response[0] === null){
			const result2 = {
				state: estadosRespuesta.USERERROR,
				response: 'El profesional no tiene la matricula asociada'
			}
			return result2;
		}
		//reviasr query de abajo, yo en realidad querria el usuario_rol del profesional que voy a asignar
		const result = await genericDAO.runQuery("select ur.id_usuario_rol from Usuario u join Usuario_Rol ur on ur.id_usuario=u.id_usuario join Rol r on r.id_rol=ur.id_rol where u.id_usuario = @id_profesional and r.descripcion='profesional' and ur.activo=1", params);
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

	delete: async function(id_paciente, id_usuario){
		if(id_paciente === undefined || id_paciente === null){
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
			},

			{
				name: "id_usuario",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			}
		]

		const result = await genericDAO.runQuery('update Paciente set activo = 0, fecha_hora_baja=GETDATE() output inserted.id_paciente from Paciente p join Rol_Paciente rp on rp.id_paciente=p.id_paciente join Usuario_Rol ur on ur.id_usuario_rol=rp.id_usuario_rol where p.id_paciente =@id_paciente and ur.id_usuario=@id_usuario', params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un paciente con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}

		return result;
	},

	update: async function(id_paciente, id_usuario, listaPaciente){
		if(listaPaciente === undefined || listaPaciente === null || listaPaciente.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'pacientes no esta definido o no contiene elementos'
			}
			return result;
		}
		if(id_paciente === undefined || id_paciente === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id del paciente no ha sido definido'
			}
			return result;
		}

		const paciente = await pacienteDAO.getById(id_paciente, id_usuario);
		if(paciente.state === estadosRespuesta.USERERROR){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'el usuario no puede modificar a ese paciente'
			}
			return result;
		}

		const params = [
			{
				name: "nombre",
				type: sql.NVarChar(255),//Puedo no definir type y se infiere automaticamente
				value: listaPaciente.nombre
			},

			{
				name: "apellido",
				type: sql.NVarChar(255),//Puedo no definir type y se infiere automaticamente
				value: listaPaciente.apellido
			},

			{
				name: "id_paciente",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_paciente
			},

			{
				name: "id_usuario",
				type: sql.Numeric(18,0),//Puedo no definir type y se infiere automaticamente
				value: id_usuario
			}
		]
		
		const result = await genericDAO.runQuery('update Paciente set nombre = @nombre, apellido=@apellido, fecha_hora_modificacion=GETDATE() output inserted.id_paciente from Paciente p join Rol_Paciente rp on rp.id_paciente=p.id_paciente join Usuario_Rol ur on ur.id_usuario_rol=rp.id_usuario_rol where p.id_paciente =@id_paciente and ur.id_usuario=@id_usuario', params);

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