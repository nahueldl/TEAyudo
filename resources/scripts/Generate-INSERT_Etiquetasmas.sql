USE [dbtesting1]
GO

SELECT 'INSERT INTO [dbo].[Etiqueta]
           ([nombre]
           ,[activo])
     VALUES
           (' + CHAR(39) + [nombre] + CHAR(39)
		+ ',1' 
		+ ')'
  FROM [dbo].[Etiqueta] order by id_etiqueta

GO


