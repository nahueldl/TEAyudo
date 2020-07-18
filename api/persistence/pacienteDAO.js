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

		const tablaPaciente = new sql.Table('Paciente');
		tablaPaciente.columns.add('nombre', sql.NVarChar(255), {nullable: false});
		tablaPaciente.columns.add('apellido', sql.NVarChar(255), {nullable: true});
		tablaPaciente.columns.add('activo', sql.Bit, {nullable: false});

		listaPacientes.forEach(paciente => {
			tablaPaciente.rows.add(
				paciente.nombre,
				paciente.apellido,
				paciente.activo || true
			);
		});

		return genericDAO.insert(tablaPaciente);
	},

	assingRolToPaciente: async function (listaRolPacientes){
		if(isNullOrUndefined(listaRolPacientes) || listaRolPacientes.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'pacientes no esta definido o no contiene elementos'
			}
			return result;
		}

		const tablaRolPaciente = new sql.Table('Rol_Paciente');
		tablaRolPaciente.columns.add('nombre', sql.NVarChar(255), {nullable: false});
		tablaRolPaciente.columns.add('apellido', sql.NVarChar(255), {nullable: true});
		tablaRolPaciente.columns.add('activo', sql.Bit, {nullable: false});

		listaRolPacientes.forEach(paciente => {
			tablaRolPaciente.rows.add(
				paciente.nombre,
				paciente.apellido,
				paciente.activo || true
			);
		});

		return genericDAO.insert(tablaRolPaciente);
	}
};


module.exports = pacienteDAO;

//funcion para sacar el rol de un usuario dado su id --> deberia estar, como la pruebo?
//crear el insert para rol_paciente dependiendo de si lo esta haciendo un familiar o un profesional