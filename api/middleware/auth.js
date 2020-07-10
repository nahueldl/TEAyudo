const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const usuarioService = require('../services/usuarioService')

module.exports.BearerStrategy = new BearerStrategy(
	async function(token, done) {
		const result = await usuarioService.getByUUID(token);
		if(result.state){
			return done(null, result.response, { scope: 'all' })
		}else{
			return done(null, false);
		}
	}
);
module.exports.isAuth = passport.authenticate('bearer', { session: false });