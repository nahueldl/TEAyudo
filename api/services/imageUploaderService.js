const cloudinary = require("cloudinary").v2;
const estadosRespuesta = require('../models/estados_respuesta');

const cloudinaryURL = process.env.CLOUDINARY_URL;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

const imageUploaderService = {

	uploadImage: async function(nombreImagen, base64Content, format, height, width){
		try{
			cloudinary.config({ 
				cloud_name: cloudinaryCloudName, 
				api_key: cloudinaryApiKey, 
				api_secret: cloudinaryApiSecret 
			  });
			const response = await cloudinary.uploader.upload(`data:image/${format};base64,${base64Content}`);
			return {
				state: estadosRespuesta.OK,
				response: response.secure_url
			};
		}catch(e){
			return null;
		}
	}

}


module.exports = imageUploaderService;