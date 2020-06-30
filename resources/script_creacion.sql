

CREATE TABLE [dbo].[TipoDocumento](
	[id_tipoDoc] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
 CONSTRAINT [pkTipoDocumento] PRIMARY KEY CLUSTERED 
(
	[id_tipoDoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Usuario](
	[id_usuario] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[id_tipoDoc] [numeric](18, 0) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[apelllido] [varchar](255) NOT NULL,
	[correo] [varchar](255) NOT NULL,
	[nro_doc] [varchar](40) NULL,
	[nro_matricula] [varchar](40) NULL,
	[fecha_hora_alta] [datetime] NOT NULL,
	[fecha_hora_baja] [datetime] NULL,
	[Tipo] [int] NOT NULL,
 CONSTRAINT [pkUsuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Usuario] ADD  CONSTRAINT [defaultUsuarioFecha_hora_alta]  DEFAULT (getdate()) FOR [fecha_hora_alta]
GO

ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [fkUsuarioTipoDocumento] FOREIGN KEY([id_tipoDoc])
REFERENCES [dbo].[TipoDocumento] ([id_tipoDoc])
GO

CREATE TABLE [dbo].[Rol](
	[id_rol] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](255) NOT NULL,
 CONSTRAINT [pkRol] PRIMARY KEY CLUSTERED 
(
	[id_rol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[Funcionalidad](
	[id_funcionalidad] [numeric](18, 0)  IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](255) NOT NULL,
 CONSTRAINT [pkFuncionalidad] PRIMARY KEY CLUSTERED 
(
	[id_funcionalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


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
GO

ALTER TABLE [dbo].[Funcionalidad_Rol]  WITH CHECK ADD  CONSTRAINT [fkFuncionalidad_RolFuncionalidad] FOREIGN KEY([id_funcionalidad])
REFERENCES [dbo].[Funcionalidad] ([id_funcionalidad])
GO

ALTER TABLE [dbo].[Funcionalidad_Rol]  WITH CHECK ADD  CONSTRAINT [fkFuncionalidad_RolRol] FOREIGN KEY([id_rol])
REFERENCES [dbo].[Rol] ([id_rol])
GO