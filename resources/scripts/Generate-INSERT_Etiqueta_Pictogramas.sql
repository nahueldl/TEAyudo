USE [dbtesting1]
GO

SELECT 'INSERT INTO [dbo].[Etiqueta_Pictograma]
           ([id_etiqueta]
           ,[id_pictograma])
     VALUES
           (' + CAST([id_etiqueta] as varchar)
      + ',' +	CAST([id_pictograma] as varchar)
	  + ')'
  FROM [dbo].[Etiqueta_Pictograma]

GO


