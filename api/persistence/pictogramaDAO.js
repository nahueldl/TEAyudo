const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');
const estadosPictograma = require('../models/estados_pictograma_personalizado');


const pictogramaDAO = {

	getByCategoriaAndPaciente: async function (id_categoria, id_paciente) {

		if (isNullOrUndefined(id_categoria) || isNullOrUndefined(id_paciente)) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id_categoria y/o id_paciente no han sido definidos'
			}
			return result;
		}

		const params = [
			{
				name: "idCategoria",
				type: sql.Numeric(18, 0),
				value: id_categoria
			},
			{
				name: "idPaciente",
				type: sql.Numeric(18, 0),
				value: id_paciente
			}
		]

		return await genericDAO.runQuery("select pi.*, pp.estado, pp.nombre_personalizado, pp.favorito from Categoria ca inner join Categoria_Pictograma cp on cp.id_categoria = ca.id_categoria inner join pictograma pi on pi.id_pictograma = cp.id_pictograma left join Pictograma_Paciente pp on pp.id_pictograma = pi.id_pictograma where ca.id_categoria = @idCategoria and (pp.id_paciente = @idPaciente or pp.id_paciente is null)", params);
	},


	getByCategoria: async function (id_categoria) {

		if (isNullOrUndefined(id_categoria)) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id_categoria no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "idCategoria",
				type: sql.Numeric(18, 0),
				value: id_categoria
			}
		]

		return await genericDAO.runQuery("select pi.* from Categoria ca inner join Categoria_Pictograma cp on cp.id_categoria = ca.id_categoria inner join pictograma pi on pi.id_pictograma = cp.id_pictograma where ca.id_categoria = @idCategoria", params);
	},


	findByTag: async function (tag) {

		if (isNullOrUndefined(tag)) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'tag no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "tag",
				type: sql.NVarChar(255),
				value: "%" + tag + "%"
			}
		]

		return await genericDAO.runQuery("select et.nombre as etiqueta, pi.* from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta inner join Pictograma pi on pi.id_pictograma = ep.id_pictograma where et.nombre like @tag and et.activo = 1 and pi.activo = 1", params);
	},


	findByNombre: async function (nombre, idPaciente = null) {

		if (isNullOrUndefined(nombre)) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'nombre no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "nombre",
				type: sql.NVarChar(255),
				value: "%" + nombre + "%"
			}
		]

		if(idPaciente === null)
			return await genericDAO.runQuery("select pi.*, np.nombre, np.nombre_plural, np.descripcion, np.tiene_locucion, np.tipo from Nombre_Pictograma np inner join Pictograma pi on pi.id_pictograma = np.id_pictograma where (np.nombre like @nombre or np.nombre_plural like @nombre) and pi.activo = 1 and np.activo = 1", params);
		else{
			params.push(
				{
					name: "idPaciente",
					type: sql.Numeric(18,0),
					value: idPaciente
				}
			);
			return await genericDAO.runQuery("select pi.*, np.nombre, np.nombre_plural, np.descripcion, np.tiene_locucion, np.tipo, pp.estado, pp.nombre_personalizado, pp.favorito from Nombre_Pictograma np inner join Pictograma pi on pi.id_pictograma = np.id_pictograma inner join Pictograma_Paciente pp on pp.id_pictograma = pi.id_pictograma where (np.nombre like @nombre or np.nombre_plural like @nombre or (pp.nombre_personalizado like @nombre and pp.id_paciente = @idPaciente)) and pi.activo = 1 and np.activo = 1", params);
		}
	},


	customizePictograma: async function (idPictograma, idPaciente, nombre, favorito, estado) {//estadosPictograma

		if (isNullOrUndefined(idPictograma) || isNullOrUndefined(idPaciente) || (isNullOrUndefined(nombre) && isNullOrUndefined(favorito))) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'Parametros necesarios no han sido definidos'
			}
			return result;
		}

		const params = [
			{
				name: "idPictograma",
				type: sql.Numeric(18, 0),
				value: idPictograma
			},
			{
				name: "idPaciente",
				type: sql.Numeric(18, 0),
				value: idPaciente
			},
			{
				name: "nombre",
				type: sql.NVarChar(255),
				value: nombre || null
			},
			{
				name: "favorito",
				type: sql.Bit,
				value: favorito || 0
			},
			{
				name: "estado",
				type: sql.Int,
				value: estado || estadosPictograma.ACTIVO
			}
		]

		return await genericDAO.runQuery("IF NOT EXISTS (SELECT * FROM Pictograma_Paciente WHERE id_paciente = @idPaciente and id_pictograma = @idPictograma) BEGIN INSERT INTO Pictograma_Paciente (id_paciente, id_pictograma, estado, nombre_personalizado, favorito) VALUES (@idPaciente, @idPictograma, @estado, @nombre, @favorito) END ELSE BEGIN UPDATE Pictograma_Paciente SET estado = @estado, nombre_personalizado = @nombre, favorito = @favorito WHERE id_paciente = @idPaciente and id_pictograma = @idPictograma END", params);
	},

	cambiarEstadoPictogramaParaPaciente: async function (idPictograma, idPaciente, estado) {

		if (isNullOrUndefined(idPictograma) || isNullOrUndefined(idPaciente) || (isNullOrUndefined(nombre) && isNullOrUndefined(favorito) && isNullOrUndefined(estado))) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'Parametros necesarios no han sido definidos'
			}
			return result;
		}

		const params = [
			{
				name: "idPictograma",
				type: sql.Numeric(18, 0),
				value: idPictograma
			},
			{
				name: "idPaciente",
				type: sql.Numeric(18, 0),
				value: idPaciente
			},
			{
				name: "estado",
				type: sql.Int,
				value: estado
			}
		]

		return await genericDAO.runQuery("IF NOT EXISTS (SELECT * FROM Pictograma_Paciente WHERE id_paciente = @idPaciente and id_pictograma = @idPictograma) BEGIN INSERT INTO Pictograma_Paciente (id_paciente, id_pictograma, estado) VALUES (@idPaciente, @idPictograma, @estado) END ELSE BEGIN UPDATE Pictograma_Paciente SET estado = @estado WHERE id_paciente = @idPaciente, id_pictograma = @idPictograma END", params);
	},


	deletePictogramaParaPaciente: async (idPictograma, idPaciente) => await this.cambiarEstadoPictogramaParaPaciente(idPictograma, idPaciente, estadosPictograma.ELIMINADO),


	reenablePictogramaParaPaciente: async (idPictograma, idPaciente) => await this.cambiarEstadoPictogramaParaPaciente(idPictograma, idPaciente, estadosPictograma.ACTIVO),


	createPictograma: async function (idCategoria, nombres, etiquetas, esquematico, sexo, violencia, activo, id_picto_arasaac, ruta_acceso_local){
		if(isNullOrUndefined(idCategoria) || isNullOrUndefined(nombres) || nombres.length < 1 || isNullOrUndefined(etiquetas) || etiquetas.length < 1){
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'Parametros necesarios no han sido definidos'
			}
			return result;
		}

		const params = [
			{
				name: "idPicto",
				type: sql.Numeric(18,0),
				value: id_picto_arasaac || null
			},
			{
				name: "ruta",
				type: sql.VarChar(255),
				value: ruta_acceso_local || null
			},
			{
				name: "schematic",
				type: sql.Bit,
				value: esquematico || null
			},
			{
				name: "sex",
				type: sql.Bit,
				value: sexo || null
			},
			{
				name: "violence",
				type: sql.Bit,
				value: violencia || null
			},
			{
				name: "activo",
				type: sql.Bit,
				value: activo || 1
			}
		];

		const tablaNombrePictograma = new sql.Table('Nombre_Pictograma');
		tablaNombrePictograma.columns.add('id_pictograma', sql.Numeric(18,0), {nullable: false});
		tablaNombrePictograma.columns.add('nombre', sql.NVarChar(255), {nullable: false});
		tablaNombrePictograma.columns.add('descripcion', sql.NVarChar(255), {nullable: true});
		tablaNombrePictograma.columns.add('tiene_locucion', sql.Bit, {nullable: true});
		tablaNombrePictograma.columns.add('tipo', sql.Int, {nullable: true});
		tablaNombrePictograma.columns.add('nombre_plural', sql.NVarChar(255), {nullable: true});
		tablaNombrePictograma.columns.add('activo', sql.Bit, {nullable: false});

		
		const tablaCategoriaPictograma = new sql.Table('Categoria_Pictograma');
		tablaCategoriaPictograma.columns.add('id_pictograma', sql.Numeric(18,0), {nullable: false});
		tablaCategoriaPictograma.columns.add('id_categoria', sql.Numeric(18,0), {nullable: false});

		let result;
		let transaction;
		try{
			transaction = await genericDAO.openTransaction();
			transaction = await transaction.begin();

			//Insertamos el pictograma
			result = await genericDAO.runQuery("INSERT INTO Pictograma ([id_picto_arasaac], [ruta_acceso_local], [esquematico], [sexo], [violencia], [activo]) OUTPUT inserted.id_pictograma VALUES (@idPicto, @ruta, @schematic, @sex, @violence, @activo)", params, {transaction});
			
			if(result.state != estadosRespuesta.OK) throw result.response;
			//Asigno el idPictograma para poder usarlo mas adelante
			result.response = result.response[0];

			//Insertamos las etiquetas y creamos las asociaciones
			for(let i = 0; i < etiquetas.length; i++){

				const etResult = await genericDAO.runQuery("IF NOT EXISTS (SELECT * FROM Etiqueta WHERE nombre = @nombreEtiq) BEGIN INSERT INTO Etiqueta (nombre, activo) OUTPUT inserted.id_etiqueta VALUES (@nombreEtiq, 1) END ELSE BEGIN SELECT id_etiqueta FROM Etiqueta WHERE nombre = @nombreEtiq END", [
					{
						name: "nombreEtiq",
						type: sql.NVarChar(255),
						value: etiquetas[i]
					}
				]);

				if(etResult.state != estadosRespuesta.OK) throw etResult.response;

				const etPicResult = await genericDAO.runQuery("INSERT INTO Etiqueta_Pictograma (id_pictograma, id_etiqueta) VALUES (@idPicto, @idEt)", [
					{
						name: "idPicto",
						type: sql.Numeric(18,0),
						value: result.response.id_pictograma
					},
					{
						name: "idEt",
						type: sql.Numeric(18,0),
						value: etResult.response[0].id_etiqueta
					}
				]);

				if(etPicResult.state != estadosRespuesta.OK) throw etPicResult.response;

			}

			//Insertamos los nombres
			nombres.forEach(nombre => {
				tablaNombrePictograma.rows.add(
					result.response.id_pictograma,
					nombre.nombre,
					nombre.descripcion || null,
					nombre.tiene_locucion || null,
					nombre.tipo || null,
					nombre.nombre_plural || null,
					1
				);
			});
	
			const nomResult = await genericDAO.insert(tablaNombrePictograma);

			if(nomResult.state != estadosRespuesta.OK) throw nomResult.response;

			//Insertamos las categorias
			tablaCategoriaPictograma.rows.add(
				result.response.id_pictograma,
				idCategoria
			);

			const catResult = await genericDAO.insert(tablaCategoriaPictograma);

			if(catResult.state != estadosRespuesta.OK) throw catResult.response;

			//Si salio todo atr commiteamos
			transaction.commit(tErr => tErr);
		
			return result;

		}catch(err){
			transaction.rollback(tErr => tErr)

			result = {
				state: estadosRespuesta.SERVERERROR,
				response: 'Ha ocurrido un error inesperado en el servidor'
			};

			console.error(err);
		}

		return result;
		
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
				type: sql.Numeric(18,0),
				value: id
			}
		]

		const result = await genericDAO.runQuery("select * from Pictograma where id_pictograma = @id", params);

		if(result.state === estadosRespuesta.OK && result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro un pictograma con ese id";
		}else if(result.state === estadosRespuesta.OK){
			result.response = result.response[0];
		}
		
		return result;
	},

}


module.exports = pictogramaDAO;