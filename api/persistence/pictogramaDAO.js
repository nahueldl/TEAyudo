const sql = require('mssql');
const genericDAO = require('./genericDAO');
const estadosRespuesta = require('../models/estados_respuesta');
const estadosPictograma = require('../models/estados_pictograma_personalizado');

const pictogramaDAO = {

	getById: async function (id, idPaciente = null) {

		if (id === undefined || id === null) {
			const result = {
				state: estadosRespuesta.USERERROR,
				response: 'id no ha sido definido'
			}
			return result;
		}

		const params = [
			{
				name: "id",
				type: sql.NVarChar(255),
				value: id
			}
		]
		let result;
		if(idPaciente === null)
			result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Pictograma pi where pi.id_pictograma = @id and pi.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo", params);
		else{
			params.push(
				{
					name: "idPaciente",
					type: sql.Numeric(18,0),
					value: idPaciente
				}
			);
			result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pp.estado, pp.nombre_personalizado, pp.favorito, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Pictograma pi left join Pictograma_Paciente pp on pp.id_pictograma = pi.id_pictograma where pi.id_pictograma = @id and (pp.id_paciente is null or pp.id_paciente = @idPaciente) and pi.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo, pp.estado, pp.nombre_personalizado, pp.favorito", params);
		}

		if(result.response === null || result.response === undefined || result.response.length < 1){
			result.state = estadosRespuesta.USERERROR;
			result.response = "No se encontro ningun pictograma con ese Id";
		}

		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response.forEach(picto => picto.etiquetas = JSON.parse(picto.etiquetas));
			result.response = result.response[0];
		}
		
		return result;
	},


	getByCategoriaAndPaciente: async function (id_categoria, id_paciente) {

		if (id_categoria === undefined || id_categoria === null || id_paciente === undefined || id_paciente === null) {
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

		const result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pp.estado, pp.nombre_personalizado, pp.favorito, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Categoria ca inner join Categoria_Pictograma cp on cp.id_categoria = ca.id_categoria inner join pictograma pi on pi.id_pictograma = cp.id_pictograma left join Pictograma_Paciente pp on pp.id_pictograma = pi.id_pictograma where pi.activo = 1 and ca.id_categoria = @idCategoria and ca.activo = 1 and (pp.id_paciente = @idPaciente or pp.id_paciente is null) group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo, pp.estado, pp.nombre_personalizado, pp.favorito", params);
	
		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response.forEach(picto => picto.etiquetas = JSON.parse(picto.etiquetas));
		}
		return result;
	},


	getByCategoria: async function (id_categoria) {

		if (id_categoria === undefined || id_categoria === null) {
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

		const result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Categoria ca inner join Categoria_Pictograma cp on cp.id_categoria = ca.id_categoria inner join pictograma pi on pi.id_pictograma = cp.id_pictograma where ca.id_categoria = @idCategoria and ca.activo = 1 and pi.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo", params);
		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response.forEach(picto => picto.etiquetas = JSON.parse(picto.etiquetas));
		}
		return result;
	},


	findByTag: async function (tag) {

		if (tag === undefined || tag === null) {
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

		const result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta inner join Pictograma pi on pi.id_pictograma = ep.id_pictograma where et.nombre like @tag and et.activo = 1 and pi.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo", params);
		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response.forEach(picto => picto.etiquetas = JSON.parse(picto.etiquetas));
		}
		return result;
	},


	findByNombre: async function (nombre, idPaciente = null) {

		if (nombre === undefined || nombre === null) {
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
		let result;
		if(idPaciente === null)
			result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas from Nombre_Pictograma np inner join Pictograma pi on pi.id_pictograma = np.id_pictograma where (np.nombre like @nombre or np.nombre_plural like @nombre) and pi.activo = 1 and np.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo, np.activo", params);
		else{
			params.push(
				{
					name: "idPaciente",
					type: sql.Numeric(18,0),
					value: idPaciente
				}
			);
			result = await genericDAO.runQuery("select pi.id_pictograma, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pp.estado, pp.nombre_personalizado, pp.favorito, (select np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural from Nombre_Pictograma np where np.id_pictograma = pi.id_pictograma and np.activo = 1 FOR JSON AUTO) as nombres, (select et.id_etiqueta, et.nombre, et.fecha_hora_alta from Etiqueta et inner join Etiqueta_Pictograma ep on ep.id_etiqueta = et.id_etiqueta where ep.id_pictograma = pi.id_pictograma and et.activo = 1 FOR JSON AUTO) as etiquetas  from Nombre_Pictograma np inner join Pictograma pi on pi.id_pictograma = np.id_pictograma inner join Pictograma_Paciente pp on pp.id_pictograma = pi.id_pictograma where (np.nombre like @nombre or np.nombre_plural like @nombre or (pp.nombre_personalizado like @nombre and pp.id_paciente = @idPaciente)) and pi.activo = 1 and np.activo = 1 group by pi.id_pictograma, pi.id_picto_arasaac, pi.ruta_acceso_local, pi.esquematico, pi.sexo, pi.violencia, pi.fecha_hora_alta, pi.fecha_hora_modificacion, pi.fecha_hora_baja, pi.activo, pp.estado, pp.nombre_personalizado, pp.favorito", params);
		}
		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response.forEach(picto => picto.etiquetas = JSON.parse(picto.etiquetas));
		}
		return result;
	},


	customizePictograma: async function (idPictograma, idPaciente, nombre, favorito, estado) {

		if (idPictograma === undefined || idPictograma === null || idPaciente === undefined || idPaciente === null || ((nombre === undefined || nombre === null) && (favorito === undefined || favorito === null))) {
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

		if (idPictograma === undefined || idPictograma === null || idPaciente === undefined || idPaciente === null || ((nombre === undefined || nombre === null) && (favorito === undefined || favorito === null) && (estado === undefined || estado === null))) {
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
		if(idCategoria === undefined || idCategoria === null || nombres === undefined || nombres === null || nombres.length < 1 || etiquetas === undefined || etiquetas === null || etiquetas.length < 1){
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
						value: etiquetas[i].nombre
					}
				], {transaction});

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
				], {transaction});

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
	
			const nomResult = await genericDAO.insert(tablaNombrePictograma, {transaction});

			if(nomResult.state != estadosRespuesta.OK) throw nomResult.response;

			//Insertamos las categorias
			tablaCategoriaPictograma.rows.add(
				result.response.id_pictograma,
				idCategoria
			);

			const catResult = await genericDAO.insert(tablaCategoriaPictograma, {transaction});

			if(catResult.state != estadosRespuesta.OK) throw catResult.response;

			//Si salio todo atr commiteamos
			await transaction.commit();
			return result;

		}catch(err){
			
			try{
				await transaction.rollback()
			}catch(err){

			}
			result = {
				state: estadosRespuesta.SERVERERROR,
				response: 'Ha ocurrido un error inesperado en el servidor'
			};

			console.error(err);
		}

		return result;
		
	},

	getForGame: async function () {

		const result = await genericDAO.runQuery("select p.id_pictograma, p.ruta_acceso_local, p.esquematico, p.sexo, p.violencia, p.fecha_hora_alta, p.fecha_hora_modificacion, p.fecha_hora_baja, (select * from (select id_nombre_pictograma, nombre, descripcion, tiene_locucion, tipo, nombre_plural, correcta from (select top(3) np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural, 0 as correcta from Nombre_Pictograma np where id_pictograma != p.id_pictograma order by NEWID()) as a union select top(1) np.id_nombre_pictograma, np.nombre, np.descripcion, np.tiene_locucion, np.tipo, np.nombre_plural, 1 as correcta from Nombre_Pictograma np where np.id_pictograma = p.id_pictograma) as b FOR JSON AUTO) as nombres from pictograma p where p.id_pictograma = ( select top(1) p.id_pictograma from Pictograma p inner join Categoria_Pictograma cp on cp.id_pictograma = p.id_pictograma inner join Categoria c on c.id_categoria = cp.id_categoria where p.activo = 1 and c.activo = 1 and c.id_usuario_rol is null order by NEWID() )");

		if(result.state === estadosRespuesta.OK){
			result.response.forEach(picto => picto.nombres = JSON.parse(picto.nombres));
			result.response = result.response[0];
		}
		
		return result;
	},

}


module.exports = pictogramaDAO;