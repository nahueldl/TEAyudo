const sql = require('mssql');
const genericDAO = require('./genericDAO');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALTROUNDS);
const ttlResetToken = parseInt(process.env.RESETPASSWORD_TIME);
const { v4: uuidv4 } = require('uuid');
const estadosRespuesta = require('../models/estados_respuesta');
var base62 = require('base62-random');

const usuarioDAO = {

	getById: async function(id){
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
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Usuario where id_usuario = @id and activo = 1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	getByEmail: async function(email){
		if(email === undefined || email === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'email no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "email",
				type: sql.NVarChar(255),
				value: email
			}
		]

		const result = await genericDAO.runQuery("select * from Usuario where correo = @email and activo = 1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con ese email";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	getByUUID: async function(uuid){
		if(uuid === undefined || uuid === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'uuid no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "uuid",
				type: sql.VarChar(36),
				value: uuid
			},
			{
				name: "horas_duracion_sesion",
				type: sql.Int,
				value: ((parseInt(process.env.SESSION_TIME)/1000)/60)/60
			}
		]

		const result = await genericDAO.runQuery("select * from Usuario where uuid = @uuid and datediff(hour, fecha_hora_ultimo_login, getdate()) < @horas_duracion_sesion and activo = 1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con uuid dentro del tiempo de sesion activa";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (usuario){
		if(usuario === undefined || usuario === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'usuario no esta definido'
			}
			return result;
		}

		const result = await this.getByEmail(usuario.correo);

		if(result.state === estadosRespuesta.OK){
			return {
				state: estadosRespuesta.CONFLICT,
				response: 'Ya existe un usuario con ese correo'
			};
		}

		const tablaUsuario = new sql.Table('Usuario');
		tablaUsuario.columns.add('id_tipo_documento', sql.Numeric(18,0), {nullable: true});
		tablaUsuario.columns.add('nombre', sql.NVarChar(255), {nullable: false});
		tablaUsuario.columns.add('apellido', sql.NVarChar(255), {nullable: false});
		tablaUsuario.columns.add('correo', sql.NVarChar(255), {nullable: false});
		tablaUsuario.columns.add('hashed_password', sql.VarChar(60), {nullable: true});
		tablaUsuario.columns.add('nro_doc', sql.NVarChar(40), {nullable: true});
		tablaUsuario.columns.add('nro_matricula', sql.NVarChar(40), {nullable: true});
		tablaUsuario.columns.add('activo', sql.Bit, {nullable: false});

		const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);

		tablaUsuario.rows.add(
			usuario.id_tipo_doc || null,
			usuario.nombre,
			usuario.apellido,
			usuario.correo,
			hashedPassword,
			usuario.nro_doc || null,
			usuario.nro_matricula || null,
			true
		);

		return genericDAO.insert(tablaUsuario);
	},


	login: async function(email, password){
		if(email === undefined || email === null || password === undefined || password === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'email y/o password no estan definidas'
			}
			return result;
		}

		const resultUsuario = await this.getByEmail(email);

		if(resultUsuario.state !== estadosRespuesta.OK)
			return resultUsuario;

		const usuario = resultUsuario.response;

		const res = {
			state: null,
			response: null
		};
		try{
			const match = await bcrypt.compare(password, usuario.hashed_password)
			if(match){
				const uuid = uuidv4();
				
				const params = [
					{
						name: "uuid",
						type: sql.VarChar(36),
						value: uuid
					},
					{
						name: "id",
						type: sql.Numeric(18,0),
						value: usuario.id_usuario
					}
				];
	
				const result = await genericDAO.runQuery("update Usuario set uuid = @uuid, fecha_hora_ultimo_login = getdate() where id_usuario = @id", params);
	
				if(result.state === estadosRespuesta.OK){
					res.state = estadosRespuesta.OK;
					res.response = uuid;
				}else{
					res.state = estadosRespuesta.SERVERERROR;
					res.response = "Ha ocurrido un error tratando de crear la sesión";
				}
	
			}else{
				res.state = estadosRespuesta.USERERROR;
				res.response = "La contraseña no es correcta";
			}
		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = "Ha ocurrido un error tratando de crear la sesión";
		}
		
		return res;
	},


	generateForgotPasswordToken: async function(id){
		if(id === undefined || id === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id no esta definido'
			}
			return result;
		}

		const res = {
			state: null,
			response: null
		};

		try{

			const token = base62(64);
			const hashedToken = await bcrypt.hash(token, saltRounds);

			const params = [
				{
					name: "id",
					type: sql.Numeric(18,0),
					value: id
				},
				{
					name: "hashedToken",
					type: sql.NVarChar(60),
					value: hashedToken
				}
			];

			const result = await genericDAO.runQuery("update Usuario set reset_password_token = @hashedToken, fecha_hora_reset_password = getdate() where id_usuario = @id and activo = 1", params);

			if(result.state === estadosRespuesta.OK){
				res.state = estadosRespuesta.OK;
				res.response = token;
			}else{
				res.state = estadosRespuesta.SERVERERROR;
				res.response = "Ha ocurrido un error tratando de crear el token de reseteo de contraseña";
			}
	
		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = "Ha ocurrido un error tratando de crear el token de reseteo de contraseña";
		}
		
		return res;
	},


	updateForgottenPassword: async function(usuario, token, newPassword){
		if(usuario === undefined || usuario === null || token === undefined || token === null || newPassword === undefined || newPassword === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'usuario, token o newPassword no esta definido'
			}
			return result;
		}

		const res = {
			state: null,
			response: null
		};

		try{

			
			if(usuario.reset_password_token === undefined || usuario.reset_password_token === null || usuario.fecha_hora_reset_password === undefined || usuario.fecha_hora_reset_password === null){
				res.state = estadosRespuesta.USERERROR;
				res.response = "El token no es valido";
				return res;
			}

			const match = await bcrypt.compare(token, usuario.reset_password_token);
			//TODO chequear el ttl del token para que no genere un error 500 si ya no es valido
			if(!match){
				res.state = estadosRespuesta.USERERROR;
				res.response = "El token no es valido"
				return res;
			}

			const tokenDate = usuario.fecha_hora_reset_password;


			const date = new Date();
			const utcString = date.toUTCString();
			const utcCurrentDate = new Date(utcString);
			let currentDate = new Date();
			currentDate.setTime(utcCurrentDate - (3*60*60*1000));

			if(currentDate.getTime() - tokenDate.getTime() > ttlResetToken){
				res.state = estadosRespuesta.USERERROR;
				res.response = `El token ya no es valido, genere uno nuevo (HORA ACTUAL ${currentDate} | HORA TOKEN ${tokenDate})`
				return res;
			}

			const hashedToken = await bcrypt.hash(token, saltRounds);
			const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

			const params = [
				{
					name: "id",
					type: sql.Numeric(18,0),
					value: usuario.id_usuario
				},
				{
					name: "ttlToken",
					type: sql.NVarChar(60),
					value: (ttlResetToken/1000)/60
				},
				{
					name: "hashedPassword",
					type: sql.NVarChar(60),
					value: hashedPassword
				},
				{
					name: "resetToken",
					type: sql.NVarChar(60),
					value: hashedToken
				}
			];

			const result = await genericDAO.runQuery("update Usuario set hashed_password = @hashedPassword, fecha_hora_reset_password = NULL, reset_password_token = NULL where id_usuario = @id and activo = 1", params);

			if(result.state === estadosRespuesta.OK){
				res.state = estadosRespuesta.OK;
				res.response = "Se ha reestablecido correctamente la contraseña";
			}else{
				res.state = estadosRespuesta.SERVERERROR;
				res.response = "Ha ocurrido un error tratando de reestablecer la contraseña";
			}
		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = "Ha ocurrido un error tratando de reestablecer la contraseña";
		}

		return res;
	},


	updateUsuario: async function(usuario, data){
		if(usuario === undefined || usuario === null || data === undefined || data === null){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'No se han definido parametros'
			}
			return result;
		}
		const res = {
			state: null,
			response: null
		};

		let hashedPassword = null;
		if(data.password != null && data.password != undefined)
			hashedPassword = await bcrypt.hash(data.password, saltRounds);

		const params = [
			{
				name: "id",
				type: sql.Numeric(18,0),
				value: usuario.id_usuario || null
			},
			{
				name: "nombre",
				type: sql.NVarChar(255),
				value: data.nombre || null
			},
			{
				name: "apellido",
				type: sql.NVarChar(255),
				value: data.apellido || null
			},
			{
				name: "hashedPassword",
				type: sql.NVarChar(60),
				value: hashedPassword || null
			},
			{
				name: "nroDoc",
				type: sql.NVarChar(40),
				value: data.nro_doc || null
			},
			{
				name: "nroMatricula",
				type: sql.NVarChar(40),
				value: data.nro_matricula || null
			},
			{
				name: "correo",
				type: sql.NVarChar(40),
				value: data.correo || null
			},
			{
				name: "idTipoDocumento",
				type: sql.Numeric(18,0),
				value: data.id_tipo_documento || null
			}
		];

		try{

			const result = await genericDAO.runQuery("update Usuario set nombre = ISNULL(@nombre, nombre), apellido = ISNULL(@apellido, apellido), hashed_password = ISNULL(@hashedPassword, hashed_password), nro_doc = ISNULL(@nroDoc, nro_doc), nro_matricula = ISNULL(@nroMatricula, nro_matricula), correo = ISNULL(@correo, correo), id_tipo_documento = ISNULL(@idTipoDocumento, id_tipo_documento) where id_usuario = @id", params);
			
			if(result.state === estadosRespuesta.OK){
				res.state = estadosRespuesta.OK;
				res.response = "La información del usuario ha sido actualizada con éxito";
			}else{
				res.state = estadosRespuesta.SERVERERROR;
				res.response = "Ha ocurrido un error tratando de actualizar la información";
			}

		}catch(err){
			res.state = estadosRespuesta.SERVERERROR;
			res.response = "Ha ocurrido un error tratando de actualizar la información";
		}

		return res;

	},


	getProfesionales: async function(){
		const params = []

		const result = await genericDAO.runQuery("select u.id_usuario, u.nombre, u.apellido, u.correo, u.nro_doc, u.nro_matricula, u.fecha_hora_alta from Usuario u inner join Usuario_Rol ur on ur.id_usuario = u.id_usuario where ur.id_rol = 2 and u.activo = 1", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ningún usuario profesional";
		}
		
		return result;
	},


	getProfesionalByPaciente: async function(id){
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
				type: sql.Numeric(18,0),
				value: id
			}
		];

		const result = await genericDAO.runQuery("select u.nombre, u.apellido, u.correo, u.nro_doc, u.nro_matricula, u.fecha_hora_alta from Usuario u inner join Usuario_Rol ur on ur.id_usuario = u.id_usuario inner join Rol_Paciente rp on rp.id_usuario_rol = ur.id_usuario_rol where ur.id_rol = 2 and u.activo = 1 and rp.id_paciente = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.NOCONTENT;
			result.response = "No se encontro ningún profesional asociado";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},

	deleteProfesionalByPaciente: async function(id){
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
				type: sql.Numeric(18,0),
				value: id
			}
		];

		const result = await genericDAO.runQuery("delete from Rol_Paciente where id_rol_paciente = (select rp.id_rol_paciente from Usuario_Rol ur inner join Rol_Paciente rp on rp.id_usuario_rol = ur.id_usuario_rol where ur.id_rol = 2 and rp.id_paciente = @id)", params);

		return result;
	}

};


module.exports = usuarioDAO;