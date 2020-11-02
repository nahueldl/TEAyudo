USE [dbtesting1]
GO

SELECT 'INSERT INTO [dbo].[Pictograma]
           ([id_picto_arasaac]
           ,[ruta_acceso_local]
           ,[esquematico]
           ,[sexo]
           ,[violencia]
           ,[activo])
     VALUES
           (' + CAST([id_picto_arasaac]	 AS varchar)
      + ',' + CHAR(39) + [ruta_acceso_local] + CHAR(39)
      + ',' +	CAST([esquematico]		 AS varchar)
      + ',' +	CAST([sexo]				 AS varchar)
      + ',' +	CAST([violencia]		 AS varchar)
      + ',' +	CAST([activo]			 AS varchar)
	  + ')'
  FROM [dbo].[Pictograma] order by id_pictograma

GO


