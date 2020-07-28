const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALTROUNDS);
const ttlResetToken = parseInt(process.env.RESETPASSWORD_TIME);
const { v4: uuidv4 } = require('uuid');
const estadosRespuesta = require('../models/estados_respuesta');
var base62 = require('base62-random');

const usuarioDAO = {

	getById: async function(id){
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
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Usuario where id_usuario = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	getByEmail: async function(email){
		if(isNullOrUndefined(email)){
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

		const result = await genericDAO.runQuery("select * from Usuario where correo = @email", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con ese email";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	getByUUID: async function(uuid){
		if(isNullOrUndefined(uuid)){
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

		const result = await genericDAO.runQuery("select * from Usuario where uuid = @uuid and datediff(hour, fecha_hora_ultimo_login, getdate()) < @horas_duracion_sesion", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un usuario con uuid dentro del tiempo de sesion activa";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},


	insert: async function (usuario){
		if(isNullOrUndefined(usuario)){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'usuario no esta definido'
			}
			return result;
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
		if(isNullOrUndefined(email)){
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
		if(isNullOrUndefined(id)){
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

			const result = await genericDAO.runQuery("update Usuario set reset_password_token = @hashedToken, fecha_hora_reset_password = getdate() where id_usuario = @id", params);

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
		if(isNullOrUndefined(usuario) || isNullOrUndefined(token) || isNullOrUndefined(newPassword)){
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

			
			if(isNullOrUndefined(usuario.reset_password_token) || isNullOrUndefined(usuario.fecha_hora_reset_password)){
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

			const tokenDate = new Date(usuario.fecha_hora_reset_password);
			const currentDate = new Date();

			if(currentDate.getTime() - tokenDate.getTime() > ttlResetToken){
				res.state = estadosRespuesta.USERERROR;
				res.response = "El token ya no es valido, genere uno nuevo"
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

			const result = await genericDAO.runQuery("update Usuario set hashed_password = @hashedPassword, fecha_hora_reset_password = NULL, reset_password_token = NULL where id_usuario = @id", params);

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
	}
};

module.exports = usuarioDAO;