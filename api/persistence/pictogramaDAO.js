const sql = require('mssql');
const genericDAO = require('./genericDAO');
const { isNullOrUndefined } = require('util');
const estadosRespuesta = require('../models/estados_respuesta');


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
	}

}


module.exports = pictogramaDAO;