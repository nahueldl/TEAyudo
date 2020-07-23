USE [dbtesting1]
GO

SELECT 'INSERT INTO [dbo].[Categoria_Pictograma]
           ([id_categoria]
           ,[id_pictograma])
     VALUES
           (' + CAST([id_categoria] as varchar)
      + ',' + CAST([id_pictograma] as varchar)
	  + ')'
  FROM [dbo].[Categoria_Pictograma]

GO


