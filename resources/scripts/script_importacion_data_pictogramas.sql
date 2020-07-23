begin transaction
--Abro el json
DECLARE @JSON VARCHAR(MAX)
SELECT @JSON = BulkColumn
FROM OPENROWSET 
(BULK 'C:\2020_06_28-pictogramas.json', SINGLE_NCLOB) 
AS j


--declaro las variables por las que voy a operar en cada entrada
declare @idPicto numeric(18, 0)
declare @schematic bit
declare @sex bit
declare @violence bit
declare @downloads int
declare @tags nvarchar(max)  
declare @categories nvarchar(max)
declare @keywords nvarchar(max)
declare @created datetime
declare @lastUpdated datetime

declare @nuevoPictograma table (idPictograma numeric(18,0)) 

declare @nombreCategoria varchar(255)
declare @nuevaCategoria table (idCategoria numeric(18,0)) 

declare @nombreEtiqueta varchar(255)
declare @nuevaEtiqueta table (idEtiqueta numeric(18,0)) 


--Recorro con un cursor todas las entradas que levanto
DECLARE MY_CURSOR CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR 
Select * FROM OPENJSON (@JSON)
WITH (   
              id   numeric(18,0) '$._id' ,
			  schematic bit '$.schematic',
			  sex bit '$.sex',
			  violence bit '$.violence',
			  downloads int '$.downloads',
			  tags     nvarchar(max)     AS JSON,  
              categories     nvarchar(max)     AS JSON,  
              keywords nvarchar(max) AS JSON,
			  created datetime '$.created',
			  lastUpdated datetime '$.lastUpdated'
 ) 

OPEN MY_CURSOR
FETCH NEXT FROM MY_CURSOR INTO @idPicto, @schematic, @sex, @violence, @downloads, @tags, @categories, @keywords, @created, @lastUpdated
WHILE @@FETCH_STATUS = 0
BEGIN 
    
	INSERT INTO Pictograma ([id_picto_arasaac]
	       ,[ruta_acceso_local]
		   ,[esquematico]
           ,[sexo]
           ,[violencia]
		   ,[activo])
	OUTPUT inserted.id_pictograma INTO @nuevoPictograma
	VALUES (@idPicto, 'https://api.arasaac.org/api/pictograms/' + CAST(@idPicto as varchar), @schematic, @sex, @violence, 1)

	--Para cada categoria la inserto sino existe y sino traigo el id
	DECLARE MY_CURSOR2 CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR 
		Select value as 'nombre' FROM OPENJSON (@categories)
	
	OPEN MY_CURSOR2
	FETCH NEXT FROM MY_CURSOR2 INTO @nombreCategoria
	WHILE @@FETCH_STATUS = 0
	BEGIN
		IF NOT EXISTS (SELECT * FROM Categoria WHERE nombre = @nombreCategoria)
		   BEGIN
			   INSERT INTO Categoria (nombre,activo)
			   OUTPUT inserted.id_categoria INTO @nuevaCategoria
			   VALUES (@nombreCategoria, 1)
		   END
		ELSE
			BEGIN
				INSERT INTO @nuevaCategoria
				SELECT id_categoria FROM Categoria WHERE nombre = @nombreCategoria
			END
		FETCH NEXT FROM MY_CURSOR2 INTO @nombreCategoria
	END
	CLOSE MY_CURSOR2
	DEALLOCATE MY_CURSOR2

	--asocio las categorias con el nuevo pictograma
	INSERT INTO Categoria_Pictograma (id_pictograma, id_categoria)
	SELECT (select top 1 idPictograma from @nuevoPictograma) as 'id_pictograma', idCategoria as 'id_categoria' FROM @nuevaCategoria

	--vacio la tabla categoria
	DELETE FROM @nuevaCategoria


	--Inserto todos los keywords asociados al pictograma
	INSERT INTO Nombre_Pictograma ([id_pictograma]
           ,[nombre]
           ,[descripcion]
           ,[tiene_locucion]
           ,[tipo]
           ,[nombre_plural]
           ,[activo])
	Select (select top 1 idPictograma from @nuevoPictograma), nombre, descripcion, locucion, tipo, plural, 1 FROM OPENJSON (@keywords)	
	WITH (   
				nombre   nvarchar(255) '$.keyword',
				descripcion nvarchar(255) '$.meaning',
				locucion bit '$.hasLocution',
				tipo int '$.type',
				plural nvarchar(255) '$.plural'
	) 


	--Para cada categoria la inserto sino existe y sino traigo el id
	DECLARE MY_CURSOR3 CURSOR LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR 
		Select value as 'nombre' FROM OPENJSON (@tags)
	
	OPEN MY_CURSOR3
	FETCH NEXT FROM MY_CURSOR3 INTO @nombreEtiqueta
	WHILE @@FETCH_STATUS = 0
	BEGIN
		IF NOT EXISTS (SELECT * FROM Etiqueta WHERE nombre = @nombreEtiqueta)
		   BEGIN
			   INSERT INTO Etiqueta (nombre,activo)
			   OUTPUT inserted.id_etiqueta INTO @nuevaEtiqueta
			   VALUES (@nombreEtiqueta, 1)
		   END
		ELSE
			BEGIN
				INSERT INTO @nuevaEtiqueta
				SELECT id_etiqueta FROM Etiqueta WHERE nombre = @nombreEtiqueta
			END
		FETCH NEXT FROM MY_CURSOR3 INTO @nombreEtiqueta
	END
	CLOSE MY_CURSOR3
	DEALLOCATE MY_CURSOR3

	--asocio las etiquetas con el nuevo pictograma
	INSERT INTO Etiqueta_Pictograma (id_pictograma, id_etiqueta)
	SELECT (select top 1 idPictograma from @nuevoPictograma) as 'id_pictograma', idEtiqueta as 'id_etiqueta' FROM @nuevaEtiqueta

	--vacio la tabla etiquetas
	DELETE FROM @nuevaEtiqueta

	--vacio la tabla pictograma
	DELETE FROM @nuevoPictograma

    FETCH NEXT FROM MY_CURSOR INTO @idPicto, @schematic, @sex, @violence, @downloads, @tags, @categories, @keywords, @created, @lastUpdated
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR

