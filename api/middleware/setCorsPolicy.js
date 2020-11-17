
const corsPolicy = (req, res, next) => {
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");
	res.header("Access-Control-Allow-Credentials", "True");
	next();
}


module.exports = corsPolicy;