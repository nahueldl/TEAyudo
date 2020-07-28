USE [dbtesting1]
GO
update Nombre_Pictograma set descripcion = replace(descripcion, char(39), '"')
SELECT 'INSERT INTO [dbo].[Nombre_Pictograma]
           ([id_pictograma]
           ,[nombre]
           ,[descripcion]
           ,[tiene_locucion]
           ,[tipo]
           ,[nombre_plural]
           ,[activo])
     VALUES
           (' + CAST([id_pictograma] as varchar)
      + ',' + CASE WHEN [nombre] is not null THEN CHAR(39) + [nombre] + CHAR(39) ELSE 'NULL' END
      + ',' + CASE WHEN [descripcion] is not null THEN CHAR(39) + [descripcion] + CHAR(39) ELSE 'NULL' END
      + ',' + CAST([tiene_locucion] as varchar)
      + ',' + CAST([tipo] as varchar)
      + ',' + CASE WHEN [nombre_plural] is not null THEN CHAR(39) + [nombre_plural] + CHAR(39) ELSE 'NULL' END
      + ',' + CAST([activo] as varchar)
	  + ')'
  FROM [dbo].[Nombre_Pictograma]

GO