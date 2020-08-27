const informeDAO = {
    insert: async function (informe){
		if(isNullOrUndefined(informe)){
			const result = {
				response: 'informe no esta definido'
			}
			return result;
		}

		const tablaInforme = new sql.Table('Informe');
        tablaInforme.columns.add('id_usuario_rol', sql.Numeric(18,0), {nullable: true});
        // si los informes los van a hacer solo los profesionales podriamos sacarlo? POdria ir el id profesional
        tablaInforme.columns.add('id_paciente', sql.Numeric(18,0), {nullable: true});
		tablaInforme.columns.add('ruta_documento', sql.NVarChar(255), {nullable: false});

		tablaInforme.rows.add(
			informe.id_usuario_rol || null,
			informe.id_paciente,
			informe.ruta_documento
		);

		return genericDAO.insert(tablaInforme);
	}
}