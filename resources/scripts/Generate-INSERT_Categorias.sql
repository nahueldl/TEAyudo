USE [dbtesting1]
GO

SELECT 'INSERT INTO [dbo].[Categoria]
           ([nombre]
           ,[activo])
     VALUES
           (' + CHAR(39) + [nombre] + CHAR(39)
      + ',' + CAST([activo] as varchar)
	  + ')'
  FROM [dbo].[Categoria] order by id_categoria

GO


