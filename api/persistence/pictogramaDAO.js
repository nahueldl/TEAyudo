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

	reenablePictogramaParaPaciente: async (idPictograma, idPaciente) => await this.cambiarEstadoPictogramaParaPaciente(idPictograma, idPaciente, estadosPictograma.ACTIVO)

}


module.exports = pictogramaDAO;