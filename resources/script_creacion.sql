/*
CREATE Tipo_Documento
 */
CREATE TABLE [dbo].[TipoDocumento](
	[id_tipoDoc] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkTipoDocumento] PRIMARY KEY CLUSTERED 
(
	[id_tipoDoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/*
CREATE Usuario
 */
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[id_tipoDoc] [numeric](18, 0) NOT NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[apelllido] [nvarchar](255) NOT NULL,
	[correo] [nvarchar](255) NOT NULL,
	[hashed_password] [binary](60) NULL,
	[nro_doc] [nvarchar](40) NULL,
	[nro_matricula] [nvarchar](40) NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_baja] [datetime] NULL,
	[Tipo] [int] NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkUsuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [defaultUsuarioFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]

ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [fkUsuarioTipoDocumento] FOREIGN KEY([id_tipoDoc])
REFERENCES [dbo].[TipoDocumento] ([id_tipoDoc])


/*
CREATE Rol
 */
CREATE TABLE [dbo].[Rol](
	[id_rol] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
 CONSTRAINT [pkRol] PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/*
CREATE Funcionalidad
 */
CREATE TABLE [dbo].[Funcionalidad](
	[id_funcionalidad] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
 CONSTRAINT [pkFuncionalidad] PRIMARY KEY CLUSTERED 
(
	[id_funcionalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


/*
CREATE Funcionalidad_Rol
 */
CREATE TABLE [dbo].[Funcionalidad_Rol](
	[id_funcionalidad_rol] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_funcionalidad] [numeric](18, 0) NOT NULL,
	[id_rol] [numeric](18, 0) NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkFuncionalidad_Rol] PRIMARY KEY CLUSTERED 
(
	[id_funcionalidad_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Funcionalidad_Rol]  WITH CHECK ADD  CONSTRAINT [fkFuncionalidad_RolFuncionalidad] FOREIGN KEY([id_funcionalidad])
REFERENCES [dbo].[Funcionalidad] ([id_funcionalidad])

ALTER TABLE [dbo].[Funcionalidad_Rol]  WITH CHECK ADD  CONSTRAINT [fkFuncionalidad_RolRol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Rol] ([id_rol])


/*
CREATE Usuario_Rol
 */
CREATE TABLE [dbo].[Usuario_Rol](
	[id_usuario_rol] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_usuario] [numeric](18, 0) NOT NULL,
	[id_rol] [numeric](18, 0) NOT NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkUsuario_Rol] PRIMARY KEY CLUSTERED 
(
	[id_usuario_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Usuario_Rol]  WITH CHECK ADD  CONSTRAINT [fkUsuario_RolRol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Rol] ([id_rol])

ALTER TABLE [dbo].[Usuario_Rol]  WITH CHECK ADD  CONSTRAINT [fkUsuario_RolUsuario] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])


/*
CREATE Categoria
 */
CREATE TABLE [dbo].[Categoria](
	[id_categoria] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_usuario_rol] [numeric](18, 0) NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_baja] [datetime] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkCategoria] PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Categoria]  WITH CHECK ADD  CONSTRAINT [fkCategoriaUsuario_Rol] FOREIGN KEY([id_usuario_rol])
REFERENCES [dbo].[Usuario_Rol] ([id_usuario_rol])

ALTER TABLE [dbo].[Categoria] ADD  CONSTRAINT [defaultCategoriaFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]


/*
CREATE Pictograma
 */
CREATE TABLE [dbo].[Pictograma](
	[id_pictograma] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_picto_arasaac] [numeric](18, 0) NULL,
	[ruta_acceso_local] [varchar](255) NOT NULL,
	[esquematico] [bit] NULL,
	[sexo] [bit] NULL,
	[violencia] [bit] NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_modificacion] [datetime] NULL,
	[fecha_hora_baja] [datetime] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkPictograma] PRIMARY KEY CLUSTERED 
(
	[id_pictograma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Pictograma] ADD  CONSTRAINT [defaultPictogramaFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]


/*
CREATE Categoria_Pictograma
 */
CREATE TABLE [dbo].[Categoria_Pictograma](
	[id_categoria_pictograma] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_categoria] [numeric](18, 0) NOT NULL,
	[id_pictograma] [numeric](18, 0) NOT NULL,
 CONSTRAINT [pkCategoria_Pictograma] PRIMARY KEY CLUSTERED 
(
	[id_categoria_pictograma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [dbo].[Categoria_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkCategoria_PictogramaCategoria] FOREIGN KEY([id_categoria])
REFERENCES [dbo].[Categoria] ([id_categoria])


ALTER TABLE [dbo].[Categoria_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkCategoria_PictogramaPictograma] FOREIGN KEY([id_pictograma])
REFERENCES [dbo].[Pictograma] ([id_pictograma])


/*
CREATE Etiqueta
 */
CREATE TABLE [dbo].[Etiqueta](
	[id_etiqueta] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_baja] [datetime] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkEtiqueta] PRIMARY KEY CLUSTERED 
(
	[id_etiqueta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Etiqueta] ADD  CONSTRAINT [defaultEtiquetaFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]


/*
CREATE Etiqueta_Pictograma
 */
CREATE TABLE [dbo].[Etiqueta_Pictograma](
	[id_etiqueta_pictograma] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[id_etiqueta] [numeric](18, 0) NOT NULL,
	[id_pictograma] [numeric](18, 0) NOT NULL,
 CONSTRAINT [pkEtiqueta_Pictograma] PRIMARY KEY CLUSTERED 
(
	[id_etiqueta_pictograma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Etiqueta_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkEtiqueta_PictogramaEtiqueta] FOREIGN KEY([id_etiqueta])
REFERENCES [dbo].[Etiqueta] ([id_etiqueta])

ALTER TABLE [dbo].[Etiqueta_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkEtiqueta_PictogramaPictograma] FOREIGN KEY([id_pictograma])
REFERENCES [dbo].[Pictograma] ([id_pictograma])


/*
CREATE Nombre_Pictograma
 */
CREATE TABLE [dbo].[Nombre_Pictograma](
	[id_nombre_pictograma] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_pictograma] [numeric](18, 0) NOT NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[descripcion] [nvarchar](255) NULL,
	[tiene_locucion] [bit] NULL,
	[tipo] [int] NULL,
	[nombre_plural] [nvarchar](255) NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkNombre_Pictograma] PRIMARY KEY CLUSTERED 
(
	[id_pictograma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Nombre_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkNombre_PictogramaPictograma] FOREIGN KEY([id_pictograma])
REFERENCES [dbo].[Pictograma] ([id_pictograma])


/*
CREATE Paciente
 */
CREATE TABLE [dbo].[Paciente](
	[id_paciente] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](255) NOT NULL,
	[apelllido] [nvarchar](255) NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_modificacion] [datetime] NULL,
	[fecha_hora_baja] [datetime] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [pkPaciente] PRIMARY KEY CLUSTERED 
(
	[id_paciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Paciente] ADD  CONSTRAINT [defaultPacienteFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]


/*
CREATE Pictograma_Paciente
 */
CREATE TABLE [dbo].[Pictograma_Paciente](
	[id_pictograma_paciente] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[id_paciente] [numeric](18, 0) NOT NULL,
	[id_pictograma] [numeric](18, 0) NOT NULL,
	[estado] [int] NULL,
 CONSTRAINT [pkPictograma_Paciente] PRIMARY KEY CLUSTERED 
(
	[id_pictograma_paciente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Pictograma_Paciente]  WITH CHECK ADD  CONSTRAINT [fkPictograma_PacientePictograma] FOREIGN KEY([id_pictograma])
REFERENCES [dbo].[Pictograma] ([id_pictograma])

ALTER TABLE [dbo].[Pictograma_Paciente]  WITH CHECK ADD  CONSTRAINT [fkPictograma_PacientePaciente] FOREIGN KEY([id_paciente])
REFERENCES [dbo].[Paciente] ([id_paciente])


/*
CREATE Traduccion
 */
CREATE TABLE [dbo].[Traduccion](
	[id_traduccion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[id_paciente] [numeric](18, 0) NOT NULL,
	[frase_traducida] [nvarchar](255) NOT NULL,
	[fecha_hora] [datetime] NOT NULL,
 CONSTRAINT [pkTraduccion] PRIMARY KEY CLUSTERED 
(
	[id_traduccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Traduccion]  WITH CHECK ADD  CONSTRAINT [fkTraduccionPaciente] FOREIGN KEY([id_paciente])
REFERENCES [dbo].[Paciente] ([id_paciente])

ALTER TABLE [dbo].[Traduccion] ADD  CONSTRAINT [defaultTraduccionFecha_hora]  DEFAULT (getdate()) FOR [fecha_hora]

/*
CREATE Traduccion_Pictograma
 */
CREATE TABLE [dbo].[Traduccion_Pictograma](
	[id_traduccion_pictograma] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_pictograma] [numeric](18, 0) NOT NULL,
	[id_traduccion] [numeric](18, 0) NOT NULL,
 CONSTRAINT [pkTraduccion_Pictograma] PRIMARY KEY CLUSTERED 
(
	[id_traduccion_pictograma] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Traduccion_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkTraduccion_PictogramaPictograma] FOREIGN KEY([id_pictograma])
REFERENCES [dbo].[Pictograma] ([id_pictograma])

ALTER TABLE [dbo].[Traduccion_Pictograma]  WITH CHECK ADD  CONSTRAINT [fkTraduccion_PictogramaTraducciona] FOREIGN KEY([id_traduccion])
REFERENCES [dbo].[Traduccion] ([id_traduccion])

/*
CREATE Informe
 */
CREATE TABLE [dbo].[Informe](
	[id_informe] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_paciente] [numeric](18, 0) NOT NULL,
	[id_usuario_rol] [numeric](18, 0) NOT NULL,
	[ruta_local_documento] [numeric](18, 0) NULL,
	[fecha_hora] [datetime] NULL,
 CONSTRAINT [pkInforme] PRIMARY KEY CLUSTERED 
(
	[id_informe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Informe]  WITH CHECK ADD  CONSTRAINT [fkInformePaciente] FOREIGN KEY([id_paciente])
REFERENCES [dbo].[Paciente] ([id_paciente])

ALTER TABLE [dbo].[Informe]  WITH CHECK ADD  CONSTRAINT [fkInformeUsuario_Rol] FOREIGN KEY([id_usuario_rol])
REFERENCES [dbo].[Usuario_Rol] ([id_usuario_rol])

ALTER TABLE [dbo].[Informe] ADD  CONSTRAINT [defaultInformeFecha_hora]  DEFAULT (getdate()) FOR [fecha_hora]

/*
CREATE Jugada
 */
CREATE TABLE [dbo].[Jugada](
	[id_jugada] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[id_paciente] [numeric](18, 0) NOT NULL,
	[nivel_juego] [int] NOT NULL,
	[respondio_correctamente] [bit] NOT NULL,
	[fecha_hora] [datetime] NOT NULL,
 CONSTRAINT [pkJugada] PRIMARY KEY CLUSTERED 
(
	[id_jugada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

ALTER TABLE [dbo].[Jugada]  WITH CHECK ADD  CONSTRAINT [fkJugadaPaciente] FOREIGN KEY([id_paciente])
REFERENCES [dbo].[Paciente] ([id_paciente])

ALTER TABLE [dbo].[Jugada] ADD  CONSTRAINT [defaultJugadaFecha_hora]  DEFAULT (getdate()) FOR [fecha_hora]