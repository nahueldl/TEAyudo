
const corsPolicy = (req, res, next) => {
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
}


module.exports = corsPolicy;