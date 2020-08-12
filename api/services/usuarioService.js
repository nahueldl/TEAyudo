const usuarioDAO = require('../persistence/usuarioDAO');
const rolDAO = require('../persistence/rolDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const mailerService = require('./mailerService')

const usuarioService = {

	getById: async function(id){
		//Aca iría la lógia de negocio
		return await usuarioDAO.getById(parseInt(id));
	},

	
	getByUUID: async function(uuid){
		//Aca iría la lógia de negocio
		return await usuarioDAO.getByUUID(uuid);
	},


	insert: async function(usuario){
		//Aca iría la lógia de negocio

		//TODO: chequear que se carguen los datos del profesional, o del familiar, o de ambos
		//pero que no falte data

		//TODO: validar que el correo cumpla el formato

		const result = await usuarioDAO.insert(usuario);

		if(result.state === estadosRespuesta.OK)
			return await this.login(usuario.correo, usuario.password);
		else
			return result;
	},


	login: async function(correo, password){
		//Aca iría la lógia de negocio
		return await usuarioDAO.login(correo, password);
	},


	preparePasswordReset: async function(correo){
		//Aca iría la lógia de negocio
		const userResult = await usuarioDAO.getByEmail(correo);

		if(userResult.state !== estadosRespuesta.OK)
			return userResult;

		const tokenResult = await usuarioDAO.generateForgotPasswordToken(userResult.response.id_usuario);

		if(tokenResult.state !== estadosRespuesta.OK)
			return tokenResult;
		
		try{
			await mailerService.sendResetPasswordEmail(correo, tokenResult.response)
		}catch(err){
			if(process.env.NODE_ENV === "development"){
				return {
					state: estadosRespuesta.SERVERERROR,
					response: `No se pudo enviar el mail de restablecimiento de contraseña peeeeeeero como estamos en testing token=${tokenResult.response}`
				};
			}else{
				return {
					state: estadosRespuesta.SERVERERROR,
					response: "No se pudo enviar el mail de restablecimiento de contraseña"
				};
			}
			
		}
		return tokenResult;
	},

	resetForgottenPassword: async function(correo, token, newPassword){
		const resultUsuario = await usuarioDAO.getByEmail(correo);

		if(resultUsuario.state !== estadosRespuesta.OK)
			return resultUsuario;

		return await usuarioDAO.updateForgottenPassword(resultUsuario.response, token, newPassword);
	},


	update: async function(usuario, data){
		//Aca iría la lógia de negocio
		return await usuarioDAO.updateUsuario(usuario, data);
	},


	getUsuario: async function(usuario){

		delete usuario.hashed_password;
		delete usuario.fecha_hora_baja;
		delete usuario.activo;
		delete usuario.uuid;
		delete usuario.fecha_hora_ultimo_login;
		delete usuario.reset_password_token;
		delete usuario.fecha_hora_reset_password;

		return {
			state: estadosRespuesta.OK,
			response: usuario
		};
	}

};


module.exports = usuarioService;