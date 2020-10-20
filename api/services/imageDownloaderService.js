const axios = require('axios').default;

const imageDownloaderService = {

	downloadBase64Img: async function(url){
		try{
			const response = await axios.get(url, {responseType: 'arraybuffer'});
			
			const base64 = Buffer.from(response.data).toString('base64');

			return "data:" + response.headers["content-type"] + ";base64," + base64;
		}catch(e){
			return null;
		}
	}

}


module.exports = imageDownloaderService;